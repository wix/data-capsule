import { expect } from 'chai';
import { FrameStorageListener } from '../../src';

describe('frame-storage-listener', () => {
  it('should throw if non BaseStorage is passed', () => {
    expect(() => new FrameStorageListener({} as any)).to.throw(
      'must extend BaseStorage',
    );
  });

  it('should throw if a verifier is not passed', () => {
    const listener = new FrameStorageListener();
    try {
      (listener.start as any)();
      throw new Error();
    } catch (e) {
      expect(e.message).to.equal(
        'start function must get a verifier function as a first argument',
      );
    }
  });

  it('should throw if the passed verifier is not a function', () => {
    const listener = new FrameStorageListener();
    try {
      (listener.start as any)('hey-ho');
      throw new Error();
    } catch (e) {
      expect(e.message).to.equal(
        'start function must get a verifier function as a first argument',
      );
    }
  });

  it('should throw if the passed interceptor is not a function', () => {
    const listener = new FrameStorageListener();
    try {
      (listener.start as any)(() => {}, 'hey-ho');
      throw new Error();
    } catch (e) {
      expect(e.message).to.equal('the interceptor must be a function');
    }
  });
});
