const fs = require("fs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");

const prompt = async (payload) =>
  new Promise((resolve) => resolve(inquirer.prompt(payload)));

(async () => {
  const directoryPath = await prompt([
    {
      name: "dirPath",
      type: "input",
      message: "Введите путь к директории",
    },
  ]);
  const list = fs.readdirSync(directoryPath.dirPath);
  async function getChoice(param) {
      try {
        return currentChoice = await prompt([
            {
              name: "choice",
              type: "list",
              message: "Выберите папку или файл",
              choices: param,
            },
          ])
      } catch (err) {
          console.log(err);
      }

  }
  const {choice} = await getChoice(list);
  console.log('choice ' + choice);
//   const currentChoice = await prompt([
//     {
//       name: "choice",
//       type: "list",
//       message: "Выберите папку или файл",
//       choices: list,
//     },
//   ])

//   const isFile = fs.lstatSync(choice).isFile();
  const isDir = fs.lstatSync(choice).isDirectory();
  console.log('isDir ' + isDir);
//   const fullPath = path.join(directoryPath.dirPath, choice);
//   if (isFile) {
//     fs.readFile(fullPath, "utf-8", (err, data) => {
//       console.log(data);
//     });
//   } else {
//     const list = fs.readdirSync(fullPath);
//     getChoice(list)
//   }
})();
