import { act } from 'react-dom/test-utils';
import { useBearStore } from './sampleBearStore';

describe('Bear Store', () => {
  it('should increase bear population', () => {
    act(() => {
      useBearStore.getState().increasePopulation();
    });
    const bears = useBearStore.getState().bears;
    expect(bears).toBe(1);
  });

  it('should remove all bears', () => {
    act(() => {
      useBearStore.getState().removeAllBears();
    });
    const bears = useBearStore.getState().bears;
    expect(bears).toBe(0);
  });
});
