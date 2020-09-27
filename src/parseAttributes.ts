/**
 * Parses attributes from a CSS selector.
 *
 * @param {string} selector A CSS selector.
 * @returns {Object.<string, string>} An dictionary of the attributes in the
 *	CSS selector.
 */
const parseAttributes = (selector: string): { [name: string]: string } => {
	const attributes: { [name: string]: string } = {};
	const matches = selector.match(/\[([\w="':-]*?)\]/g);

	if (matches) {
		// iterate over matches and build attributes map
		matches.forEach(match => {
			// remove matched brackets and split on assignment
			const [name, value = ''] = match.replace(/[[\]]/g, '').split('=');

			// remove quotes from value if present
			const formattedValue = value.replace(/['"]/g, '');
			attributes[name] = formattedValue;
		});
	}

	return attributes;
};

export default parseAttributes;
