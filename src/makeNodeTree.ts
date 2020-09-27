// combinators denoting a sibling node
const siblingCombinators = ['~', '+'];

/**
 * Splits a selector into a list of selectors for each node.
 *
 * @param {string} selector A selector.
 * @returns {Array.<string>} An array with each element an array of sibling
 * node selectors.
 */
export const splitOnDescendants = (selector: string): string[] =>
	// use non-capturing groups `?:` to omit conditional group from results
	// (?:\s+(?!\s*>)) - capture 1+ whitespace not followed by `>`
	// (?:\s*>\s*) - capture `>` surrounded by any number of whitespace
	selector.trim().split(/(?:\s+(?!\s*>))|(?:\s*>\s*)/g);

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
	const splitSelector = splitOnDescendants(selector);

	// sibling nodes at current level
	let siblings: string[] = [];

	// indicates next element is a sibling node
	let isSibling = false;

	for (let i = 0; i < splitSelector.length; i++) {
		// push current element as node if not a sibling combinator
		if (siblingCombinators.indexOf(splitSelector[i]) === -1) {
			// if current element is not a sibling node, push previous set of
			// of nodes as parent level in tree
			if (!isSibling && siblings.length > 0) {
				tree.push(siblings);
				siblings = [];
			}

			siblings.push(splitSelector[i]);
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
