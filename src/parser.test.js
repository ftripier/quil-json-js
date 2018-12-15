import ohm from 'ohm-js';
import grammar from './grammar.ohm';

describe('grammar string', () => {
  it('should exist', () => {
    expect(grammar).toBeTruthy();
  });
});

describe('grammar parser', () => {
  it('should match an expression correctly', () => {
    const parser = ohm.grammar(grammar);
    expect(parser.match('1 + 1').succeeded()).toBeTruthy();
  });
});
