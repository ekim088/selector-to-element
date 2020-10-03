import parsePseudoClasses, { parsePseudoParam } from './parsePseudoClasses';
import parseTag from './parseTag';

/**
 * Returns the number of siblings to place before current node given an
 * :nth-child() parameter value.
 *
 * @param {string} nthParam An :nth-child() parameter value.
 * @returns {number} The number of siblings to make.
 */
export const getNumNthSiblings = (nthParam: string): number => {
	// split on + for functional param values i.e. 3n + 1; can base number of
	// siblings to add solely on second number if exists
	const parts = nthParam.split('+');
	const partNum = parts[1] || parts[0];
	const n = parseInt(partNum, 10);
	return n > 1 ? n - 1 : 0;
};

// combinators denoting a sibling node
const siblingCombinators = ['~', '+'];

// regex to capture sibling combinators
const siblingCombinatorRegex = /~|\+/g;

/**
 * Splits a selector into a list of selectors for each node.
 *
 * @param {string} selector A selector.
 * @returns {Array.<string>} An array with each element an array of sibling
 * node selectors.
 */
export const splitOnNodes = (selector: string): string[] => {
	// insert whitespace around adjacent sibling combinators to handle instances
	// where they are not surrounded by whitespace i.e. div+p => div + p
	let formattedSelector = selector.replace(
		siblingCombinatorRegex,
		match => ` ${match} `
	);

	// replace whitespace in between parentheses (pseudo class param values) so
	// it is not treated like a descendant
	formattedSelector = formattedSelector.replace(/\s+(?=[^()]*\))/g, '||');

	// use non-capturing groups `?:` to omit conditional group from results
	// (?:\s+(?!\s*>)) - capture 1+ whitespace not followed by `>`
	// (?:\s*>\s*) - capture `>` surrounded by any number of whitespace
	const nodes = formattedSelector
		.trim()
		.split(/(?:\s+(?!\s*>))|(?:\s*>\s*)/g);

	// revert replacement of whitespace within parenthesis
	const nodeSelectors = nodes.map(node => node.replace(/\|\|/g, ' '));

	return nodeSelectors;
};

/**
 * Transforms a selector into a node tree represented by a 2D array.
 *
 * @param {string} selector A selector.
 * @returns {Array.<Array.<string>>} A 2D array with each element containing a
 * 	list of sibling DOM nodes at that level of the tree.
 */
const makeNodeTree = (selector: string): string[][] => {
	// 2D array representing node tree
	const tree: string[][] = [];

	// split on combinators denoting a descendant node
	const splitSelector = splitOnNodes(selector);

	// sibling nodes at current level
	let siblings: string[] = [];

	// indicates next element is a sibling node
	let isSibling = false;

	for (let i = 0; i < splitSelector.length; i++) {
		const currentSelector = splitSelector[i];

		// push current element as node if not a sibling combinator
		if (siblingCombinators.indexOf(currentSelector) === -1) {
			// if current element is not a sibling node, push previous set of
			// of nodes as parent level in tree
			if (!isSibling && siblings.length > 0) {
				tree.push(siblings);
				siblings = [];
			}

			// determine if selector has :nth-child pseudo-class
			const pseudoClasses = parsePseudoClasses(currentSelector);
			const pseudoNthChild = pseudoClasses.find(
				pseudo => pseudo.indexOf('nth-child') === 0
			);
			const nthChildParam =
				pseudoNthChild && parsePseudoParam(pseudoNthChild);
			const numberOfSiblings =
				nthChildParam && getNumNthSiblings(nthChildParam);

			// push siblings before pushing current selector
			if (numberOfSiblings) {
				const baseTag = parseTag(currentSelector);

				for (let j = 0; j < numberOfSiblings; j++) {
					siblings.push(baseTag);
				}
			}

			siblings.push(currentSelector);
			isSibling = false;
		} else {
			isSibling = true;
		}
	}

	// push deepest level of tree if exists
	if (siblings.length > 0) {
		tree.push(siblings);
	}

	return tree;
};

export default makeNodeTree;
