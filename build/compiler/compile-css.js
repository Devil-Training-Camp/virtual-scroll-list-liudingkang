import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';

// postcss 打包压缩 css
export async function compileCss(code) {
  const { css } = await postcss([autoprefixer, cssnanoPlugin, postcssPresetEnv]).process(code, {
    from: undefined,
  });
  return css;
}
