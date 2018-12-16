import ohm from 'ohm-js';
import grammar from './grammar.ohm';
import * as fixtures from '../testing/fixtures';

describe('grammar string', () => {
  it('should exist', () => {
    expect(grammar).toBeTruthy();
  });
});

describe('grammar parser', () => {
  it('should match expressions correctly', () => {
    Object.keys(fixtures).forEach(fixture => {
      const sourceCode = fixtures[fixture];
      const parser = ohm.grammar(grammar);
      const match = parser.match(sourceCode);
      if (match.failed()) {
        console.error(match.message);
      }
      expect(match.succeeded()).toBeTruthy();
    });
  });
});
