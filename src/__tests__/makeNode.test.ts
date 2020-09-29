import makeNode from '../makeNode';

describe('makeNode', () => {
	it('should make a node with the correct tag', () => {
		const selector = 'span';
		expect(makeNode(selector).matches(selector)).toBeTruthy();
	});

	it('should make a node with the correct ID', () => {
		const selector = '#myId';
		expect(makeNode(selector).matches(selector)).toBeTruthy();
	});

	it('should make a node with the correct class', () => {
		const selector = '.class1.class2';
		expect(makeNode(selector).matches(selector)).toBeTruthy();
	});

	it('should make a node with the correct attribute', () => {
		const selector = '[a=b][c=d]';
		expect(makeNode(selector).matches(selector)).toBeTruthy();
	});

	it('should make a node matching the selector', () => {
		const selectors = [
			'a.b.c',
			'article#a-1.art-1.art-2',
			'span#test.fd[a="1"][b="2"][c]'
		];
		selectors.forEach(selector => {
			expect(makeNode(selector).matches(selector)).toBeTruthy();
		});
	});
});
