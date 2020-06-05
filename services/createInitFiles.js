const path = require("path");
const fs = require("fs-extra");
const templates = path.join(__dirname, "..", "templates");
const { spawnSync } = require("child_process");


const createInitFiles = async (name) => {
  if (!name) {
    throw new Error("File name required.");
  }
  await createServerInitFile(name);
  await createBinFile(name);
  await createModulesDirectory(name);
  await createRoutesFile(name);
  await createLoggerFile(name);
  await createGitIgnoreFileAndBabelrc(name);
  await editPackageJson(name);
};


const createServerInitFile = async () => {

}

module.exports = {
  createInitFiles,
};
