let config = {};
export function setBuildConfig(options) {
  config = {
    ...config,
    ...options,
  };
}
export async function getBuildConfig() {
  const defaultConfig = (await import('./default.config.js')).default;
  const mergeConfig = {
    ...defaultConfig,
    ...config,
  };
  return mergeConfig;
}
