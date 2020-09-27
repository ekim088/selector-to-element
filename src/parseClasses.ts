/**
 * Parses a list of classes in a selector. Classes with colons must double escape
 * the colon with `\\:`.
 *
 * @param {string} selector A selector.
 * @returns {Array.<string>} A list of classes in the selector.
 */
const parseClasses = (selector: string): string[] => {
	// \.([\w-]+ - match one or more characters preceded by `.`
	// (?:\\:[\w-]*)? - match escaped colon and any following alphanumeric
	const matches = selector.match(/\.([\w-]+(?:\\:[\w-]*)?)/g);

	// remove `.` character from matches if found
	return matches
		? matches.map(match => match.substring(1).replace('\\:', ':'))
		: [];
};

export default parseClasses;
