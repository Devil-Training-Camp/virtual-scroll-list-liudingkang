import type { MarkdownRenderer } from 'vitepress';

// 主要是解决 vitepress 默认主题 table 会 display block 来适配移动端宽度，但是 pc 上 table 无法自动 100% 宽度的问题;
export function wrapTablePlugin(md: MarkdownRenderer) {
  // 保存原始的table渲染器
  const defaultRender =
    md.renderer.rules.table_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    // 返回新增的div开始标签 + 原始的table开始标签
    return '<div class="table-wrapper">' + defaultRender(tokens, idx, options, env, self);
  };

  const defaultRenderClose =
    md.renderer.rules.table_close ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.table_close = function (tokens, idx, options, env, self) {
    // 返回原始的table结束标签 + 新增的div结束标签
    return defaultRenderClose(tokens, idx, options, env, self) + '</div>';
  };
}
