const inquirer = require("inquirer");
const Ora = require("ora");
const Spinner = new Ora();

const questions = require("../questions/question");
const { createFolder, createPackageJson } = require("../services/project");
const createStarterFiles = require("../services/initFiles");

const createProject = async () => {
  const answers = await inquirer.prompt(questions);
  await initProject(answers);
};

async function initProject(answers) {
  Spinner.start();
  try {
    const folderPath = await createFolder(answers["name"]);
    Spinner.succeed("New project folder created successfully.");
      
    await createPackageJson(folderPath);
    Spinner.succeed("Initial package installed successfully");

    await createStarterFiles(folderPath);
    Spinner.succeed("Initial setup files created successfully.");

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
