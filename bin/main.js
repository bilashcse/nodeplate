#! /usr/bin/env node

const program = require("commander");
const { exec } = require("child_process");

const pkg = require("../package.json");
const { createProject } = require("../src/createProject");

program
  .version(pkg.version)
  .usage("[option][name]")
  .option("-i, --init", "Initialize new project")
  .action(async function () {
    await createProject();
  });

program.parse(process.argv);
