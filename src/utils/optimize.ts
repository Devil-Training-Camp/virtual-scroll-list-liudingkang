type Timer = null | number;
type RestFunc = (...rest: unknown[]) => void;
export function throttle(func: RestFunc, time = 0, immediate = true) {
  let timer: Timer = null;
  return function (this: Window, ...rest: unknown[]) {
    if (immediate) {
      func.call(this, ...rest);
      immediate = false;
    }
    if (timer == null) {
      timer = setTimeout(() => {
        func.call(this, ...rest);
        timer = null;
      }, time);
    }
  };
}
export function RAFThrottle(func: RestFunc) {
  let flag = false;
  return function (this: Window, ...rest: unknown[]) {
    if (!flag) {
      window.requestAnimationFrame(() => {
        func.call(this, ...rest);
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
