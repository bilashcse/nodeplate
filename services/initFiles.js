const path = require("path");
const fs = require("fs-extra");
const { spawnSync } = require("child_process");

const templatesPath = path.join(__dirname, "..", "templates");

async function createStarterFiles(dirPath) {
  try {
    if (!dirPath) {
      throw new Error("The path cant be empty or cant be any old name");
    }
    /* await createServerFiles(dirPath);
    await createBinFile(dirPath);
    // await createModulesDirectory(dirPath);
    await createRoutesFile(dirPath);
     */
    await creatDevFormatorDepencency(dirPath);
    // await createLoggerFile(dirPath);
    await setUpLogger(dirPath);
    await createServerFiles(dirPath);
    await editPackageJson(dirPath);
  } catch (err) {
    throw err;
  }
}

const creatDevFormatorDepencency = async (dirPath) => {
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/gitignore.txt`, `${dirPath}/.gitignore`);
  await fs.copySync(`${templatesPath}/babelrc.txt`, `${dirPath}/.babelrc`);
  await fs.copySync(
    `${templatesPath}/prettierrc.txt`,
    `${dirPath}/.prettierrc.js`
  );
  await fs.copySync(`${templatesPath}/eslintrc.txt`, `${dirPath}/.eslintrc.js`);
};

async function createServerFiles(dirPath) {
  await fs.copySync(`${templatesPath}/index.txt`, `${dirPath}/server/app.js`);
  await fs.copySync(
    `${templatesPath}/configs.txt`,
    `${dirPath}/server/configs/config.js`
  );
  await fs.copySync(
    `${templatesPath}/celebrateHandler.txt`,
    `${dirPath}/server/utils/celebrateErrorHandler.js`
  );
  await fs.copySync(
    `${templatesPath}/date.txt`,
    `${dirPath}/server/utils/date.js`
  );
  await fs.copySync(
    `${templatesPath}/dynamicHtml.txt`,
    `${dirPath}/server/utils/dynamicHtml.js`
  );
  await fs.copySync(
    `${templatesPath}/sequelizeFilter.txt`,
    `${dirPath}/server/utils/filter.js`
  );
  await fs.copySync(
    `${templatesPath}/convertTemplateString.txt`,
    `${dirPath}/server/utils/convertTemplateString.js`
  );
  await fs.copySync(
    `${templatesPath}/sequelizeTransaction.txt`,
    `${dirPath}/server/utils/transaction.js`
  );
    
  await fs.copySync(
    `${templatesPath}/controllerIndex.txt`,
    `${dirPath}/server/controllers/index.js`
  );
    
  await fs.copySync(
    `${templatesPath}/controllerDefault.txt`,
    `${dirPath}/server/controllers/default.js`
  );
    
  await fs.copySync(
    `${templatesPath}/modelIndex.txt`,
    `${dirPath}/server/models/index.js`
  );
}

const setUpLogger = async (dirPath) => {
  await installLogger();
  await fs.copySync(
    `${templatesPath}/log4js.txt`,
    `${dirPath}/server/logger/index.js`
  );
};

async function createLoggerFile(dirPath) {
  await installLogger(dirPath);
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/logger.txt`, `${dirPath}/libs/logger.js`);
}

const installLogger = async (dirPath) => {
  return new Promise((resolve) => {
    resolve(
      spawnSync(
        "sh",
        [`${path.join(__dirname, "..", "scripts", "installLogger.sh")}`],
        {
          cwd: dirPath,
        }
      )
    );
  });
};

async function createBinFile(dirPath) {
  await fs.copySync(`${templatesPath}/bin.txt`, `${dirPath}/bin/www`);
}

async function createRoutesFile(dirPath) {
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/route.txt`, `${dirPath}/routes/index.js`);
}

async function editPackageJson(dirPath) {
  const data = await fs
    .readFileSync(`${dirPath}/package.json`, "utf8")
    .toString()
    .split("\n");
  const scriptPosition = data.indexOf('  "scripts": {');
  data.splice(
    scriptPosition + 1,
    0,
    '    "start": "nodemon --exec babel-node ./bin/www",\n    "dev": "NODE_ENV=development DEBUG=api-server:* npm run start",\n    "debug": "DEBUG=api-server:* npm run start",'
  );
  const text = data.join("\n");
  await fs.outputFileSync(`${dirPath}/package.json`, text);
}

module.exports = createStarterFiles;
