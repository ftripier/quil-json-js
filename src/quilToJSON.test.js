import * as fixtures from '../testing/fixtures';
import quilToJSON from './quilToJSON';

describe('Quil to JSON', () => {
  it('converts quil programs to a JSON representation', () => {
    const program = fixtures.flipAndMeasure;
    expect(quilToJSON(program)).toMatchSnapshot();
  });
});
