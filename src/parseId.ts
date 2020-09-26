/**
 * Parses an ID from a CSS selector. Returns the first ID found if passed
 * a selector containing multiple nodes. IDs with colons must double escape the
 * colon with `\\:`.
 *
 * @param {string} selector A CSS selector.
 * @returns {string} The ID in a selector.
 */
const parseId = (selector: string): string | null => {
	// #([\w-]+ - match one or more characters preceded by `#`
	// (?:\\:[\w-]*)? - match escaped colon and any following alphanumeric
	const match = selector.match(/#([\w-]+(?:\\:[\w-]*)?)/);
	return match && match[1].replace('\\:', ':');
};

export default parseId;
