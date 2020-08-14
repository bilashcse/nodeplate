#! /usr/bin/env node

const program = require("commander");

const pkg = require("../package.json");
const createProject = require("../module/createProject");

program
  .version(pkg.version)
  .usage("[option] [name]")
  .option("-i, --init", "Initialize new project")
  .action(async function () {
    if (!program.init) {
      program.help();
    }
    await createProject();
  });

program.parse(process.argv);
