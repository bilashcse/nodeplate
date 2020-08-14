const questions = [
    {
      type: "input",
      name: "name",
      message: "New project name: ",
      validate: (name) => typeof name === "string",
    },
];
  
module.exports = questions;