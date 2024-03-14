type Timer = null | number;
export type RestFunc = <T>(...args: T[]) => void;
export function throttle<T extends RestFunc>(func: T, time = 0, immediate = true) {
  let timer: Timer = null;
  return function (this: unknown, ...args: Parameters<T>) {
    if (immediate) {
      func.call(this, ...args);
      immediate = false;
    }
    if (timer == null) {
      timer = setTimeout(() => {
        func.call(this, ...args);
        timer = null;
      }, time);
    }
  };
}
export function RAFThrottle<T extends RestFunc>(func: T) {
  let flag = false;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!flag) {
      window.requestAnimationFrame(() => {
        func.call(this, ...args);
        flag = false;
      });
      flag = true;
    }
  };
}
export const BSStartIndex = (arr: number[], num: number) => {
  let left = 0,
    right = arr.length - 1;

  while (left != right) {
    const mid = left + ((right - left) >> 1);
    if (arr[mid] > num) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return Math.max(0, left - 1);
};
