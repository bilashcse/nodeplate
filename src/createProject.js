const inquirer = require("inquirer");
const ora = require("ora");

// const { createInitFiles } = require("../services/createInitFiles");
// const {
//   createInitialStructure,
// } = require("../services/createInitialStructure");

const { initProjectStructure } = require("../services/initializeStructure");

const spinner = new ora({
  text: "Initialize your project . . . .",
});

const questions = [
  {
    type: "input",
    name: "name",
    message: "Type you project name: ",
    validate: (name) => typeof name === "string",
  },
];

const initProject = async (answer) => {
  try {
    spinner.start();
    spinner.info("Initialize Project Structure . . .");
    await initProjectStructure(answer.name, spinner);
    spinner.succeed("Initialize structure creation done.");

    // await createInitialStructure(answer);
    //await createInitFiles(answer.name);
    // await createEnvVariables(folderPath);
  } catch (err) {
    console.error(err);
  }
};

const createProject = async () => {
  const answer = await inquirer.prompt(questions);
  await initProject(answer);
};

module.exports = {
  createProject,
};
