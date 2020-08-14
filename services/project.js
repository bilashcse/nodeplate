const path = require("path");
const fs = require("fs-extra");
const { spawnSync } = require("child_process");


function createPackageJson(name, folderPath) {
    return new Promise(resolve => {
      resolve(
        spawnSync("sh", [`${path.join(__dirname, "..", "scripts", "createPackage.sh")}`], {
          cwd: folderPath
        })
      );
    });
  }

async function createFolder(dirName) {
  const name = dirName.toLowerCase().replace(" ", "");
  if (!name) {
    throw new Error("Project name cant be empty.");
  }

  if (!(await fs.pathExistsSync(name))) {
    const folderPath = path.join(path.resolve(), name);
    fs.ensureDirSync(name);
    await createPackageJson(name, folderPath);
    return folderPath;
  } else {
    throw new Error("Project name already exists");
  }
}



module.exports = createFolder;