module.exports = {
  root: true,
  env: {
    browser: true
  },
  // 扩展配置文件
  extends: [
    'standard', // es
    "prettier", // 关闭和 prettier 冲突的 eslint 配置
    'plugin:prettier/recommended', // 把 prettier rule 当做 eslint rule 来执行 
    'plugin:vue/vue3-recommended', // vue
    'plugin:@typescript-eslint/recommended', // ts
  ],
  parser: 'vue-eslint-parser', // to lint vue
  // 解析器
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {},
  ignorePatterns: [
    'node_modules/**',
    'dist/**',
    'demo/**'
  ]
}