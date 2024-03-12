import { useResizeObserver } from "./common/useResizeObserver";

export const useRO = (positions) => {
  const updateItemsHeight = (index, newHeight) => {
    // console.log('upitem', index, newHeight);
    const pos = positions[index];
    const diff = newHeight - pos.height; // 新的高度差异
    pos.height = newHeight;
    for (let i = index + 1, len = positions.length; i < len; i++) {
      positions[i].top += diff; // 更新当前 item 后所有item 的高度
    }
  };
  const updatePositions = (entries) => {
    for (const { borderBoxSize, target } of entries) {
      const boxSize = borderBoxSize[0]; // 变化的 item 的 size
      const index = Number(target.dataset.index);
      if (positions[index].height != boxSize.blockSize) {
        updateItemsHeight(index, boxSize.blockSize); // 更新当前 item 的 pos
      }
    }
  }
  // 监听 item 改变
  useResizeObserver('resizeOb', updatePositions);
}