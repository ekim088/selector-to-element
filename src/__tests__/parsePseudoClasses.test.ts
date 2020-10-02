import parsePseudoClasses, { parsePseudoValue } from '../parsePseudoClasses';

describe('parsePseudoClasses', () => {
	const pseudoClasses = [
		'active',
		'any-link',
		'blank',
		'checked',
		'current',
		'default',
		'defined',
		'dir()',
		'disabled',
		'drop',
		'empty',
		'enabled',
		'first-child',
		'first-of-type',
		'first',
		'focus-visible',
		'focus-within',
		'focus',
		'fullscreen',
		'future',
		'has()',
		'host-context',
		'host()',
		'hover',
		'in-range',
		'indeterminate',
		'invalid',
		'is()',
		'lang()',
		'last-child',
		'last-of-type',
		'left',
		'link',
		'local-link',
		'not()',
		'nth-child()',
		'nth-col()',
		'nth-last-child()',
		'nth-last-col()',
		'nth-last-of-type()',
		'nth-of-type()',
		'only-child',
		'only-of-type',
		'optional',
		'out-of-range',
		'past',
		'placeholder-shown',
		'read-only',
		'read-write',
		'required',
		'right',
		'root',
		'scope',
		'state()',
		'target-within',
		'target',
		'user-invalid',
		'valid',
		'visited',
		'where()'
	];

	it('should parse a list of pseudo classes', () => {
		const selectorOfPseudos = `div${pseudoClasses
			.map(pseudo => `:${pseudo}`)
			.join('')}`;
		const matchedPsuedoArr = parsePseudoClasses(selectorOfPseudos);
		pseudoClasses.forEach(pseudo => {
			expect(matchedPsuedoArr).toContain(pseudo);
		});
	});

	it('should capture values of pseudo classes that accept a value', () => {
		expect(parsePseudoClasses('*:active:not(span):first')).toEqual([
			'active',
			'not(span)',
			'first'
		]);
		expect(parsePseudoClasses('*:active:not(span#myId.a):first')).toEqual([
			'active',
			'not(span#myId.a)',
			'first'
		]);
		expect(
			parsePseudoClasses('*:not(span > div + .a ~ #b.c):last-child')
		).toEqual(['not(span > div + .a ~ #b.c)', 'last-child']);
		expect(parsePseudoClasses('div:nth-of-type(4n + 1):active')).toEqual([
			'nth-of-type(4n + 1)',
			'active'
		]);
	});

	describe('parsePseudoValue', () => {
		it('should parse the value within a pseudo class', () => {
			expect(parsePseudoValue(':not(p a)')).toEqual('p a');
			expect(parsePseudoValue(':not(div #a.b.c + #d)')).toEqual(
				'div #a.b.c + #d'
			);
			expect(parsePseudoValue(':nth-of-type(2n + 1)')).toEqual('2n + 1');
		});

		it('should return an empty string if no value', () => {
			expect(parsePseudoValue(':not()')).toEqual('');
			expect(parsePseudoValue(':first-child')).toEqual('');
		});
	});
});
