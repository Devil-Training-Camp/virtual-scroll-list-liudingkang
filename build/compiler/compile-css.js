import postcss from 'postcss';

// postcss 打包压缩 css
export async function compileCss(code) {
  const { css } = await postcss().process(code, {
    from: undefined,
  });
  return css;
}
