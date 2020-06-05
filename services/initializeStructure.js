const path = require("path");
const fs = require("fs-extra");
const { spawnSync } = require("child_process");

const templatesPath = path.join(__dirname, "..", "templates");

const initProjectStructure = async (projectName, spinner) => {
  const name = projectName.toLowerCase().replace(" ", "");
  if (!name) {
    throw new Error("The name cant be empty");
  }

  if (!(await fs.pathExistsSync(name))) {
    const folderPath = path.join(path.resolve(), name);
    fs.ensureDirSync(name);
    await createPackageJson(folderPath, spinner);
    await createBabelRc(folderPath, spinner);
    await createPrettier(folderPath, spinner);
    await createEsLint(folderPath, spinner);

    return folderPath;
  } else {
    throw new Error("Directory name already exists");
  }
};

const createPackageJson = async (dirPath, spinner) => {
  spinner.info("Initialize package.json . .");
  await fs.copySync(
    `${templatesPath}/package.json`,
    `${dirPath}/package.json`
  );
};
const createPrettier = async (dirPath, spinner) => {
  spinner.info("Initialize prettier . .")
  await fs.copySync(
    `${templatesPath}/prettierrc.js`,
    `${dirPath}/prettierrc.js`
  );
};
const createEsLint = async (dirPath, spinner) => {
  spinner.info("Initialize eslint . . . ")
  await fs.copySync(`${templatesPath}/eslintrc.js`, `${dirPath}/eslintrc.js`);
};
const createBabelRc = async (dirPath, spinner) => {
  spinner.info("Initialize babel . . .")
  await fs.copySync(`${templatesPath}/babelrc`, `${dirPath}/babelrc`);
};

module.exports = {
  initProjectStructure,
};
