const fs = require("fs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");

const executionDir = process.cwd();
const isFile = (path) => fs.lstatSync(path).isFile();
// const list = fs.readdirSync(executionDir).filter(isFile);

inquirer
  .prompt([
    {
      name: "directionPath",
      type: "input",
      message: "Введите путь к дирректории",
    },
  ])
  .then(function getFilesFromDirectory({ directionPath }) {
    const list = fs.readdirSync(directionPath);
    inquirer
      .prompt([
        {
          name: "currentChoice",
          type: "list",
          message: "Выберите папку или файл",
          choices: list,
        },
      ])
      .then(({ currentChoice }) => {
        // console.log('executionDir ' + executionDir);
        const isFile = fs.lstatSync(currentChoice).isFile();
        const fullPath = path.join(directionPath, currentChoice);
        // console.log("directionPath" + directionPath);
        // console.log('isFile ' + isFile);
        // console.log('currentChoice ' + currentChoice);
        if (isFile) {
          fs.readFile(fullPath, "utf-8", (err, data) => {
            console.log(data);
          });
          //   console.log("file " + currentChoice);
        } else {
          //   console.log("currentChoice " + currentChoice);
          //   const fullPath = path.join(directionPath, currentChoice);
          getFilesFromDirectory(fullPath);
          //   console.log(typeof fullPath);
          //   getFilesFromDirectory({ directionPath });
        }
      });
  });
