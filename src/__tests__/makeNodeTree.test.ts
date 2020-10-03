import makeNodeTree, { getNumNthSiblings, splitOnNodes } from '../makeNodeTree';

describe('makeNodeTree', () => {
	it('should return a node tree as 2D array', () => {
		expect(makeNodeTree('div p')).toEqual([['div'], ['p']]);
		expect(makeNodeTree('#a.b #c.d.e f')).toEqual([
			['#a.b'],
			['#c.d.e'],
			['f']
		]);
	});

	it('should support general sibling combinator', () => {
		expect(makeNodeTree('div .a ~ p .b')).toEqual([
			['div'],
			['.a', 'p'],
			['.b']
		]);
		expect(makeNodeTree('div .a~p .b')).toEqual([
			['div'],
			['.a', 'p'],
			['.b']
		]);
	});

	it('should support adjacent sibling combinator', () => {
		expect(makeNodeTree('div .a + p .b')).toEqual([
			['div'],
			['.a', 'p'],
			['.b']
		]);
		expect(makeNodeTree('div .a+p .b')).toEqual([
			['div'],
			['.a', 'p'],
			['.b']
		]);
	});

	it('should support the :nth-child() pseudo class with an integer value', () => {
		expect(makeNodeTree('div span:nth-child(2)')).toEqual([
			['div'],
			['span', 'span:nth-child(2)']
		]);
		expect(makeNodeTree('div .a.b:nth-child(3)')).toEqual([
			['div'],
			['div', 'div', '.a.b:nth-child(3)']
		]);
		expect(makeNodeTree('div span:nth-child(-1)')).toEqual([
			['div'],
			['span:nth-child(-1)']
		]);
		expect(makeNodeTree('div span:nth-child(0)')).toEqual([
			['div'],
			['span:nth-child(0)']
		]);
		expect(makeNodeTree('div span:nth-child(1)')).toEqual([
			['div'],
			['span:nth-child(1)']
		]);
	});

	it('should support the :nth-child() pseudo class with a functional value', () => {
		expect(makeNodeTree('div span:nth-child(5n + 2)')).toEqual([
			['div'],
			['span', 'span:nth-child(5n + 2)']
		]);
	});

	describe('splitOnNodes', () => {
		it('should split on descendent and child combinators', () => {
			expect(splitOnNodes('div .a')).toEqual(['div', '.a']);
			expect(splitOnNodes('div > .a')).toEqual(['div', '.a']);
			expect(splitOnNodes('div > .a #b > p')).toEqual([
				'div',
				'.a',
				'#b',
				'p'
			]);
			expect(
				splitOnNodes(
					'div + span .a[b=c] .test:has(div ul.list li[data-item="testing"]) button'
				)
			).toEqual([
				'div',
				'+',
				'span',
				'.a[b=c]',
				'.test:has(div ul.list li[data-item="testing"])',
				'button'
			]);
		});

		it('should handle extra whitespace', () => {
			expect(splitOnNodes(' div  p ')).toEqual(['div', 'p']);
			expect(splitOnNodes(' div  >  p ')).toEqual(['div', 'p']);
			expect(splitOnNodes(' .a  div  >  p ')).toEqual(['.a', 'div', 'p']);
		});

		it('should split on child combinators with and without adjacent whitespace', () => {
			expect(splitOnNodes('div>p')).toEqual(['div', 'p']);
			expect(splitOnNodes('.a>.b.c')).toEqual(['.a', '.b.c']);
		});

		it('should treat adjacent sibling combinators as individual nodes', () => {
			expect(splitOnNodes('div + p')).toEqual(['div', '+', 'p']);
			expect(splitOnNodes('.a ~ .b.c')).toEqual(['.a', '~', '.b.c']);
		});

		it('should support adjacent sibling combinators without adjacent whitespace', () => {
			expect(splitOnNodes('div+p')).toEqual(['div', '+', 'p']);
			expect(splitOnNodes('.a~.b.c')).toEqual(['.a', '~', '.b.c']);
			expect(splitOnNodes('.a~.b+.c')).toEqual([
				'.a',
				'~',
				'.b',
				'+',
				'.c'
			]);
		});

		it('should not treat functional pseudo class parameter values as child combinators', () => {
			expect(splitOnNodes('div span:nth-child(n + 4) a')).toEqual([
				'div',
				'span:nth-child(n + 4)',
				'a'
			]);
		});
	});

	describe('getNumNthSiblings', () => {
		it('should return the number of siblings for integer values', () => {
			expect(getNumNthSiblings('0')).toEqual(0);
			expect(getNumNthSiblings('1')).toEqual(0);
			expect(getNumNthSiblings('-1')).toEqual(0);
			expect(getNumNthSiblings('2')).toEqual(1);
			expect(getNumNthSiblings('1234')).toEqual(1233);
			expect(getNumNthSiblings('  2  ')).toEqual(1);
		});

		it('should return the number of siblings for "An" values', () => {
			expect(getNumNthSiblings('0n')).toEqual(0);
			expect(getNumNthSiblings('1n')).toEqual(0);
			expect(getNumNthSiblings('-1n')).toEqual(0);
			expect(getNumNthSiblings('2n')).toEqual(1);
			expect(getNumNthSiblings('1234n')).toEqual(1233);
			expect(getNumNthSiblings('  2n  ')).toEqual(1);
		});

		it('should return the number of siblings for functional values', () => {
			expect(getNumNthSiblings('n + 1')).toEqual(0);
			expect(getNumNthSiblings('n + 2')).toEqual(1);
			expect(getNumNthSiblings('n+2')).toEqual(1);
			expect(getNumNthSiblings('2n + 1')).toEqual(0);
			expect(getNumNthSiblings('2n + 2')).toEqual(1);
			expect(getNumNthSiblings('2n + 5')).toEqual(4);
			expect(getNumNthSiblings('5n + 2')).toEqual(1);
		});
	});
});
