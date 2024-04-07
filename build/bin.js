#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .command('build')
  .description('Compile components')
  .option('-m --modern', 'Build with esbuild')
  .action(async options => {
    const { build } = await import('./commands/build.js');
    build(options);
  });

program
  .command('dev')
  .description('Devolop components')
  .action(async () => {
    const { dev } = await import('./commands/dev.js');
    dev();
  });

program
  .command('test')
  .description('Run test')
  .option('-w, --watch', 'Watch files and return tests')
  .option('-c, --component <componentName>', 'Test target component')
  .option('-cov, --coverage', 'Generate the coverage')
  .action(async options => {
    const { test } = await import('./commands/test.js');
    test(options);
  });
program.parse();
