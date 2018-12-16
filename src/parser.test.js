import ohm from 'ohm-js';
import grammar from './grammar.ohm';
import flipAndMeasure from '../testing/fixtures/flip-and-measure.quil';

describe('grammar string', () => {
  it('should exist', () => {
    expect(grammar).toBeTruthy();
  });
});

describe('grammar parser', () => {
  it('should match an expression correctly', () => {
    const parser = ohm.grammar(grammar);
    const match = parser.match(flipAndMeasure);
    if (match.failed()) {
      console.error(match.message);
    }
    expect(parser.match(flipAndMeasure).succeeded()).toBeTruthy();
  });
});
