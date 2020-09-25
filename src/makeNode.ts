/**
 * Parses a list of classes in a CSS selector.
 *
 * @param {string} selector A CSS selector.
 * @returns {Array.<string>} A list of classes in the selector.
 */
export const parseClasses = (selector: string): string[] => {
	const matches = selector.match(/\.([\w-_]+)/g);

	// remove `.` character from matches if found
	return matches ? matches.map(match => match.substring(1)) : [];
};

// WIP
const makeNode = (selector: string): Element => document.createElement('div');

export default makeNode;
