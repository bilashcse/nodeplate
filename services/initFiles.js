const path = require("path");
const fs = require("fs-extra");

const templatesPath = path.join(__dirname, "..", "templates");

const createStarterFiles = async (dirPath) => {
  try {
    if (!dirPath) {
      throw new Error("The path cant be empty or cant be any old name");
    }

    await creatDevFormatorDepencency(dirPath);
    await setUpLogger(dirPath);
    await createServerFiles(dirPath);
    await editPackageJson(dirPath);
  } catch (err) {
    throw err;
  }
};

const creatDevFormatorDepencency = async (dirPath) => {
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/gitignore`, `${dirPath}/.gitignore`);
  await fs.copySync(`${templatesPath}/babelrc`, `${dirPath}/.babelrc`);
  await fs.copySync(
    `${templatesPath}/prettierrc.js`,
    `${dirPath}/.prettierrc.js`
  );
  await fs.copySync(`${templatesPath}/eslintrc.js`, `${dirPath}/.eslintrc.js`);
};

const createServerFiles = async (dirPath) => {
  await fs.copySync(`${templatesPath}/app.js`, `${dirPath}/server/app.js`);
  await fs.copySync(
    `${templatesPath}/config.js`,
    `${dirPath}/server/configs/config.js`
  );
  await fs.copySync(
    `${templatesPath}/celebrateHandler.js`,
    `${dirPath}/server/utils/celebrateErrorHandler.js`
  );
  await fs.copySync(
    `${templatesPath}/date.js`,
    `${dirPath}/server/utils/date.js`
  );
  await fs.copySync(
    `${templatesPath}/filter.js`,
    `${dirPath}/server/utils/filter.js`
  );
  await fs.copySync(
    `${templatesPath}/convertTemplateString.js`,
    `${dirPath}/server/utils/convertTemplateString.js`
  );
  await fs.copySync(
    `${templatesPath}/transaction.js`,
    `${dirPath}/server/utils/transaction.js`
  );

  await fs.copySync(
    `${templatesPath}/controllerIndex.js`,
    `${dirPath}/server/controllers/index.js`
  );

  await fs.copySync(
    `${templatesPath}/controllerDefault.js`,
    `${dirPath}/server/controllers/default.js`
  );

  await fs.copySync(
    `${templatesPath}/modelIndex.js`,
    `${dirPath}/server/models/index.js`
  );
};

const setUpLogger = async (dirPath) => {
  await fs.copySync(
    `${templatesPath}/log4js.js`,
    `${dirPath}/server/logger/index.js`
  );
};
const editPackageJson = async (dirPath) => {
  const data = await fs
    .readFileSync(`${dirPath}/package.json`, "utf8")
    .toString()
    .split("\n");
  const scriptPosition = data.indexOf('  "scripts": {');
  data.splice(
    scriptPosition + 1,
    0,
    '    "start": "nodemon --exec babel-node server/app.js",\n    "dev": "NODE_ENV=development DEBUG=api-server:* npm run start",\n    "debug": "DEBUG=api-server:* npm run start",'
  );
  const text = data.join("\n");
  await fs.outputFileSync(`${dirPath}/package.json`, text);
};

module.exports = createStarterFiles;
