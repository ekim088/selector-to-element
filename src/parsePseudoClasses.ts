/**
 * Parses a list of pseudo classes in a selector.
 *
 * @param {string} selector A selector.
 * @returns {Array.<string>} A list of pseudo classes in the selector.
 */
const parsePseudoClasses = (selector: string): string[] => {
	const matches = selector.match(/:([^_\W]+(?:([^_\W]|[\s>#.+~(-])*\)?)?)/g);

	// remove `:` character from matches
	return matches ? matches.map(match => match.substring(1)) : [];
};

/**
 * Parses a value within a pseudo class.
 *
 * @param {string} selector A selector.
 * @param pseudo
 * @returns {string} A pseudo class value.
 */
export const parsePseudoValue = (pseudo: string): string => {
	const match = pseudo.match(/\((.*?)\)/);
	return match ? match[1] : '';
};

export default parsePseudoClasses;
