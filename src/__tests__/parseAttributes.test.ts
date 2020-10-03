import parseAttributes from '../parseAttributes';

describe('parseAttributes', () => {
	it('should parse attributes', () => {
		expect(parseAttributes('[someAttr=someValue]')).toEqual({
			someAttr: 'someValue'
		});
		expect(parseAttributes('[someAttr="someValue"]')).toEqual({
			someAttr: 'someValue'
		});
		expect(parseAttributes('[someAttr]')).toEqual({
			someAttr: ''
		});
		expect(parseAttributes('[someAttr=someValue][a=b][1=2]')).toEqual({
			'1': '2',
			a: 'b',
			someAttr: 'someValue'
		});
		expect(parseAttributes('[a-b=c-d]')).toEqual({
			'a-b': 'c-d'
		});
	});

	it('should parse attributes with loosely matched values', () => {
		expect(parseAttributes('[someAttr~="someValue"]')).toEqual({
			someAttr: 'someValue'
		});
		expect(parseAttributes('[someAttr|="someValue"]')).toEqual({
			someAttr: 'someValue'
		});
		expect(parseAttributes('[someAttr^="someValue"]')).toEqual({
			someAttr: 'someValue'
		});
		expect(parseAttributes('[someAttr$="someValue"]')).toEqual({
			someAttr: 'someValue'
		});
		expect(parseAttributes('[someAttr*="someValue"]')).toEqual({
			someAttr: 'someValue'
		});
		expect(parseAttributes('div[c|=fd][d^=sdu]')).toEqual({
			c: 'fd',
			d: 'sdu'
		});
	});

	it('should parse an attribute attached to a tag', () => {
		expect(parseAttributes('div[a=b]')).toEqual({
			a: 'b'
		});
	});

	it('should parse an attribute attached to an ID', () => {
		expect(parseAttributes('#myId[a=b]')).toEqual({
			a: 'b'
		});
	});

	it('should parse an attribute attached to a class', () => {
		expect(parseAttributes('.a.b[c=d]')).toEqual({
			c: 'd'
		});
	});

	it('should parse an attribute attached to a pseudo-class', () => {
		expect(parseAttributes('[a=b]:last-child')).toEqual({
			a: 'b'
		});
	});

	it('should parse an attribute attached to a pseudo-element', () => {
		expect(parseAttributes('[a=b]::before')).toEqual({
			a: 'b'
		});
	});

	it('should support colons in attributes', () => {
		expect(parseAttributes('[:someAttr=some:value]')).toEqual({
			':someAttr': 'some:value'
		});
		expect(parseAttributes('[:someAttr=some:value]:not(p)')).toEqual({
			':someAttr': 'some:value'
		});
	});
});
