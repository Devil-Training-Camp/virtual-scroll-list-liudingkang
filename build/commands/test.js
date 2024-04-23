import { execSync } from 'child_process';

export async function test({ component, watch, coverage }) {
  let command = 'vitest --config ./build/config/vitest.config.ts';
  if (watch) {
    command += ' -w';
  }
  if (coverage) {
    command += ' --coverage';
  }
  if (component) {
    command += ` --dir src/packages/${component.trim()}`;
  }
  console.log(command);
  execSync(command, {
    stdio: 'inherit',
    shell: true,
  });
}
