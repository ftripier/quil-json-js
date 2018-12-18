import * as fixtures from '../testing/fixtures';
import quilToJSON from './quilToJSON';

describe('Quil to JSON', () => {
  it('converts all quil programs to a JSON representation correctly', () => {
    Object.keys(fixtures).forEach(fixture => {
      const program = fixtures[fixture];
      expect(quilToJSON(program)).toMatchSnapshot();
    });
  });
});
