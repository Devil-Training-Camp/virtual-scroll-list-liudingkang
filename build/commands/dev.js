import { execSync } from 'child_process';

export async function dev() {
  execSync('rollup -wc ./build/config/rollup.dev.config.js', {
    stdio: 'inherit',
    shell: true,
  });
}
