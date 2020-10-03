/**
 * Parses attributes from a selector.
 *
 * @param {string} selector A selector.
 * @returns {Object.<string, string>} An dictionary of the attributes in the
 *	selector.
 */
const parseAttributes = (selector: string): { [name: string]: string } => {
	const attributes: { [name: string]: string } = {};

	// update loose matches like ~= to straight match =
	const formattedSelector = selector.replace(
		/(?!\[\w+)([~|^$*]=?)(?=.*\])/g,
		'='
	);
	const matches = formattedSelector.match(/(?!\[\s*)([\w="':-]*?)(?=\s*\])/g);

	if (matches) {
		// iterate over matches and build attributes map
		// regex used to capture attribute contents is capturing empty strings
		// so filter those out
		matches
			.filter(match => Boolean(match))
			.forEach(match => {
				// split on assignment
				const [name, value = ''] = match.split('=');

				// remove quotes from value if present
				const formattedValue = value.replace(/['"]/g, '');
				attributes[name] = formattedValue;
			});
	}

	return attributes;
};

export default parseAttributes;
