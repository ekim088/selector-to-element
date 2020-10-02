import makeNodeTree, { splitOnDescendants } from '../makeNodeTree';

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
	});

	it('should support adjacent sibling combinator', () => {
		expect(makeNodeTree('div .a + p .b')).toEqual([
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

	describe('splitOnDescendants', () => {
		it('should split on descendent and child combinators', () => {
			expect(splitOnDescendants('div .a')).toEqual(['div', '.a']);
			expect(splitOnDescendants('div > .a')).toEqual(['div', '.a']);
			expect(splitOnDescendants('div > .a #b > p')).toEqual([
				'div',
				'.a',
				'#b',
				'p'
			]);
		});

		it('should handle extra whitespace', () => {
			expect(splitOnDescendants(' div  p ')).toEqual(['div', 'p']);
			expect(splitOnDescendants(' div  >  p ')).toEqual(['div', 'p']);
			expect(splitOnDescendants(' .a  div  >  p ')).toEqual([
				'.a',
				'div',
				'p'
			]);
		});

		it('should split on child combinators with and without adjacent whitespace', () => {
			expect(splitOnDescendants('div>p')).toEqual(['div', 'p']);
			expect(splitOnDescendants('.a>.b.c')).toEqual(['.a', '.b.c']);
		});
	});
});
