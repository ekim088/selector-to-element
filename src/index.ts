import makeNode from './makeNode';
import makeNodeTree from './makeNodeTree';

/**
 * Transforms a selector into an HTML element.
 *
 * @param {string} selector A selector.
 * @returns {Element} A HTML Element representing the selector.
 */
const selectorToElement = (selector: string): HTMLElement => {
	let el: HTMLElement = document.createElement('div');
	const nodeTree = makeNodeTree(selector);

	// traverse each level of the node tree and set deeper nodes as children of
	// the previous parent node
	for (let i = 0; i < nodeTree.length; i++) {
		let currentNode: HTMLElement | null = null;

		for (let j = 0; j < nodeTree[i].length; j++) {
			currentNode = makeNode(nodeTree[i][j]);
			el.append(currentNode);
		}

		if (currentNode) el = currentNode;
	}

	return el;
};

export default selectorToElement;
