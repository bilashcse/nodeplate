const inquirer = require("inquirer");
const Ora = require("ora");
const Spinner = new Ora();

const questions = require('../questions/question');
const createProjectFolder = require("../services/project");
const createStarterFiles = require("../services/initFiles");

const createProject = async () => {
  const answers = await inquirer.prompt(questions);
  await initProject(answers);
};

async function initProject(answers) {
  Spinner.start();
  try {
    const folderPath = await createProjectFolder(answers["name"]);
    Spinner.succeed("New project folder created successfully.");

    await createStarterFiles(folderPath);
    Spinner.info("Initial setup files created successfully.");

    // await createEnvVariables(folderPath);
    // await createMongooseIntegration(folderPath);
    // Spinner.succeed("Starter files created");
    // Spinner.succeed("Logger files created");
    // Spinner.succeed("Basic module files created");
    // await createExampleEnvVariables(folderPath);
    Spinner.stop();
  } catch (err) {
    Spinner.fail(err.message);
    Spinner.stop();
  }
}

module.exports = createProject;
