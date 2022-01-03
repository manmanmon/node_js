const fs = require("fs/promises");
const { lstatSync } = require("fs");
const inquirer = require("inquirer");
const yargs = require("yargs");
const path = require("path");

const options = yargs
  .option("d", {
    describe: "Path to directory",
    default: process.cwd(),
  })
  .option("p", {
    describe: "Pattern",
    default: "",
  }).argv;
let currentDirectory = options.d;

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const run = async () => {
  const list = await fs.readdir(currentDirectory);
  const items = list.map(
    (fileName) => new ListItem(path.join(currentDirectory, fileName), fileName)
  );

  const item = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: `Choose: ${currentDirectory}`,
        choices: items.map((item) => ({ name: item.fileName, value: item })),
      },
    ])
    .then((answer) => answer.fileName);

  if (item.isDir) {
    currentDirectory = item.path;
    return await run();
  } else {
    const data = await fs.readFile(item.path, "utf-8");

    if (!options.p) console.log(data);
    else {
      const regExp = new RegExp(options.p, "igm");
      let coincidences = data.match(regExp).length;
      console.log("Количество совпадений: " + coincidences);
    }
  }
};

run();