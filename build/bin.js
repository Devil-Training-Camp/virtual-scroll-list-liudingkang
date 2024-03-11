#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .command('build')
  .description('Compile components')
  .option('-m --modern', 'Build with esbuild')
  .action(async options => {
    const { build } = await import('./commands/build.js');
    console.log(options);
    build(options);
  });

program
  .command('dev')
  .description('Devolop components')
  .action(async () => {
    const { dev } = await import('./commands/dev.js');
    dev();
  });
program.parse();
