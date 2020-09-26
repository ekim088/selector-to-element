/**
 * Parses an ID from a CSS selector. Returns the first ID found if passed
 * a selector containing multiple nodes.
 *
 * @param {string} selector A CSS selector.
 * @returns {string} The ID in a selector.
 */
const parseId = (selector: string): string | null => {
	const match = selector.match(/#([\w-_]+)/);
	return match && match[1];
};

export default parseId;
