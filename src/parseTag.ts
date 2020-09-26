/**
 * Parses a tag from a CSS selector. Only parses first node if selector contains
 * descendants. Returns `div` as default.
 *
 * @param {string} selector A CSS selector.
 * @returns {string} A HTML tag name.
 */
const parseTag = (selector: string): string => {
	const match = selector.match(/^\w+[^\s>#.+~[:]*/);
	return match ? match[0] : 'div';
};

export default parseTag;
