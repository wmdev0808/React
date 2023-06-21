import { sample } from "./sampleWorkingTest";

describe('sample', () => {
    it('works', () => {
      const hello = sample()
      expect(hello).toBe('hello');
    });
  });