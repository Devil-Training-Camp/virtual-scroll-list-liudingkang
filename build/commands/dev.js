import { watch } from 'rollup';

export async function dev() {
  const { devOptions } = await import('../config/rollup.dev.config.js');
  watch(devOptions);
}
