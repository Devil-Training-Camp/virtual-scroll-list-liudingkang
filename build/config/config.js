import defaultConfig from './default.config.js';
let config = {
  ...defaultConfig,
};

export function setBuildConfig(options) {
  Object.assign(config, options);
}
export async function getBuildConfig() {
  return config;
}
