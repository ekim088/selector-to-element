import { makeNode } from '../selectorToElement';

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

	it('should support the :has pseudo class', () => {
		const el = makeNode('span:has(a .b.c)');
		expect(el.tagName).toEqual('SPAN');
		expect(el.querySelector('a .b.c')).not.toBeNull();
	});

	it('should support input-based pseudo classes for selectors targeting inputs or an unknown type', () => {
		let el = makeNode('input:checked');
		expect((el as HTMLInputElement).checked).toBeTruthy();

		el = makeNode('option:checked');
		expect((el as HTMLInputElement).checked).toBeTruthy();

		el = makeNode('*:checked');
		expect(el.tagName).toEqual('INPUT');
		expect((el as HTMLInputElement).checked).toBeTruthy();

		el = makeNode(':checked');
		expect(el.tagName).toEqual('INPUT');
		expect((el as HTMLInputElement).checked).toBeTruthy();
	});

	it('should ignore input-based pseudo classes for selectors targeting non-inputs', () => {
		const el = makeNode('div:checked');
		expect(el.tagName).toEqual('DIV');
		expect((el as HTMLInputElement).checked).toBeFalsy();
	});
});
