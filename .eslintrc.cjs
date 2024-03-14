module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // 扩展配置文件
  extends: [
    'eslint:recommended', // es
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended', // ts
    'plugin:prettier/recommended', // 把 prettier rule 当做 eslint rule 来执行
    'plugin:vue/vue3-recommended', // vue
    'prettier', // 关闭和 prettier 冲突的 eslint 配置
  ],
  parser: 'vue-eslint-parser', // to lint vue
  // 解析器
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'vue/multi-word-component-names': [0],
    'import/namespace': [0],
    'import/no-named-as-default-member': [0], // 当存在命名导出时，提示使用命名导出
    '@typescript-eslint/consistent-type-imports': [2], // type 标注类型导入
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.vue', '.json'],
      },
    },
  },
  // 全局变量
  // globals: {
  //   process: true,
  // },
};
