module.exports = {
  extends: [
    'stylelint-config-standard', // stylelint standard 配置集
    'stylelint-config-recommended-scss', // scss 推荐配置
    'stylelint-config-standard-vue', // vue 配置
    'stylelint-config-prettier', // 关闭与 prettier 冲突 的配置项
  ],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
  },
};
