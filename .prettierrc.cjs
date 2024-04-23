module.exports = {
  arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSpacing: true, // 对象/数组和内容间加空格 { name: 'tina' }
  endOfLine: 'auto', // 结束行的形式
  printWidth: 100, // 超过换行格数
  proseWrap: 'preserve',
  semi: true, // 句尾分号
  singleQuote: true, // 单引号
  tabWidth: 2, // tab 大小
  useTabs: false, // 使用 空格缩进而不是 tab
  // 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
  trailingComma: 'all',
  vueIndentScriptAndStyle: true, // 允许vue中的script及style 的标签缩进
  singleAttributePerLine: true, // 每个元素属性一行
};
