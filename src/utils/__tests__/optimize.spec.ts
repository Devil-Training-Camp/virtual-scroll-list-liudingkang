import { describe, expect, test, vi } from 'vitest';

import { throttle } from '../optimize';
import { delay } from '../test';

describe('test throttle', () => {
  test('test immediate true', async () => {
    const cb = vi.fn();
    const fn = throttle(cb, 0, true);
    fn();
    expect(cb).toBeCalledTimes(1);
  });
  test('test immediate false', async () => {
    const cb = vi.fn();
    const fn = throttle(cb, 0, false);
    fn();
    expect(cb).toBeCalledTimes(0);
  });
  test('test delay', async () => {
    const cb = vi.fn();
    const fn = throttle(cb, 0, true);
    fn();
    expect(cb).toBeCalledTimes(1);
    fn();
    expect(cb).toBeCalledTimes(1);
    await delay();
    expect(cb).toBeCalledTimes(2);
  });
  test('test throttle', async () => {
    const cb = vi.fn();
    const fn = throttle(cb, 50, true);
    fn();
    fn();
    fn();
    expect(cb).toBeCalledTimes(1);
    await delay(50);
    expect(cb).toBeCalledTimes(2);
  });
});
