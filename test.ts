interface VInfo {
  major: string;
  minor: string;
  patch: string;
  prerelease: string;
  preItems: string[];
  compileInfo: string;
}

function versionCompare(v1: string, v2: string): number {
  const p1 = parseV(v1);
  const p2 = parseV(v2);
  switch (finalCompare(p1, p2)) {
    case 1:
      return 1;
    case -1:
      return -1;
  }
  preCompare(p1, p2);
}
function finalCompare(p1: VInfo, p2: VInfo): number {
  const { major: major1, minor: minor1, patch: patch1 } = p1;
  const { major: major2, minor: minor2, patch: patch2 } = p2;
  switch (strNumCompare(major1, major2)) {
    case 1:
      return 1;
    case -1:
      return -1;
  }
  switch (strNumCompare(minor1, minor2)) {
    case 1:
      return 1;
    case -1:
      return -1;
  }
  switch (strNumCompare(patch1, patch2)) {
    case 1:
      return 1;
    case -1:
      return -1;
  }
  return 0;
}
function preCompare(p1: VInfo, p2: VInfo): number {
  const { preItems: preItems1 } = p1;
  const { preItems: preItems2 } = p2;
  const maxLen = Math.max(preItems1.length, preItems2.length);
  for (let i = 0; i < maxLen; i++) {
    const item1 = preItems1[i];
    const item2 = preItems2[i];
    // 有一个不存在
    if (preItems1[i].length === 0 || preItems2[i].length === 0) {
      return preItems1[i].length > 0 ? 1 : -1;
    }
    // 两个都存在
    if (isStrNum(item1) && isStrNum(item2)) {
      // 都由数字组成，比较数字大小
      switch (strNumCompare(item1, item2)) {
        case 1:
          return 1;
        case -1:
          return -1;
      }
    } else {
      // 有一个不为数字，按 ASCII 顺序比较
    }
  }
  return 0;
}
function strNumCompare(v1: string, v2: string): number {
  if (v1.length !== v2.length) {
    return v1.length > v2.length ? 1 : -1;
  }
  for (let i = 0, len = v1.length; i < len; i++) {
    if (v1[i] !== v2[i]) {
      return v1[i] > v2[i] ? 1 : -1;
    }
  }
  return 0;
}
function isStrNum(s: string): boolean {
  return s.length > 0 && !Number.isNaN(Number(s));
}

function parseV(v: string): VInfo {
  const reg = /(\d+?)\.(\d+?)\.(\d+?)-?([\w.]*)\+?([\w.]*)/;
  const matchInfo = v.match(reg);
  return {
    major: matchInfo[1],
    minor: matchInfo[2],
    patch: matchInfo[3],
    prerelease: matchInfo[4],
    preItems: matchInfo[4].split('.'),
    compileInfo: matchInfo[5],
  };
}

console.log(versionCompare('1.2.3', '9.8.7'));
