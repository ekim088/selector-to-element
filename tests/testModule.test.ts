import testModule from '../src/testModule';

describe('testModule', () => {
	it('should pass', () => {
		expect(testModule('ed')).toBe('Hello ed');
	});
});
