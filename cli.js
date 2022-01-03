#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require('readline');
const inquirer = require("inquirer");

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Введите путь до файла:', function (inputPath) {
//     const filePath = path.join(__dirname, inputPath);

//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         console.log(data);
//     });

//     rl.close();
// });

const executionDir = process.cwd();
// const isFile = (path) => fs.lstatSync(path).isFile();
// const list = fs.readdirSync(executionDir).filter(isFile);
const getRootDir = () => path.parse(process.cwd()).root;

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

inquirer
  .prompt([
    {
      name: "directoryPath",
      type: "input",
      message: "Введите путь к дирректории",
      // choices: list,
    },
  ])
  .then(({ directoryPath }) => {
    if (directoryPath) {
      return directoryPath;
    } else {
      return (directoryPath = executionDir);
    }
  })
  .then((directoryPath) => {
    inquirer
      .prompt([
        {
          type: "fuzzypath",
          name: "filePath",
          excludePath: (nodePath) => nodePath.startsWith("node_modules"),
          excludeFilter: (nodePath) => nodePath == ".",
          itemType: "any",
          rootPath: directoryPath,
          message: "Выберите папку или файл:",
          default: directoryPath,
          suggestOnly: false,
          depthLimit: 5,
        },
      ])
      .then(({ filePath }) => {
        // const isFile = (filePath) => fs.lstatSync(filePath).isFile();
        // const list = fs.readdirSync(filePath).filter(isFile);

        // console.log(list);

        // while (!)
        fs.readFile(filePath, "utf-8", (err, data) => {
          console.log(data);
        });
      });
  });
// .then((directoryPath) => {
//     // const filePath = path.join(directoryPath, file);
//     // console.log(filePath);
//     console.log(directoryPath);
// })
// .then(({file}, directoryPath) => {
//     const filePath = path.join(directoryPath, file);
//     console.log(filePath);
// })

// const prompt = async (prompt) => new Promise (resolve => inquirer.prompt(prompt, resolve));

// (async() => {
//     const directoryPath = await prompt([
//         {
//             name: 'directoryPath',
//             type: 'input',
//             message: 'Введите путь к файлу',
//             // choices: list,
//         }
//     ]);
//     console.log('123' + directoryPath);

//     // const file = await prompt([
//     //     {
//     //       type: 'fuzzypath',
//     //       name: 'file',
//     //       excludePath: nodePath => nodePath.startsWith('node_modules'),
//     //       excludeFilter: nodePath => nodePath == '.',
//     //       itemType: 'any',
//     //       rootPath: directoryPath,
//     //       message: 'Select a target directory for your component:',
//     //       default: directoryPath,
//     //       suggestOnly: false,
//     //       depthLimit: 5,
//     //     }
//     // ]);
//     // const filePath = path.join(directoryPath, file);
//     // fs.readFile(filePath, 'utf-8', (err, data) => {
//     //     console.log(data);
//     // });
// })()

// inquirer.prompt([
//     {
//         name: 'directoryPath',
//         type: 'input',
//         message: 'Введите путь к файлу',
//         // choices: list,
//     }
// ]).then(({ directoryPath }) => {
//     if (directoryPath) {

//         console.log(directoryPath);
//     } else {
//         directoryPath = executionDir;
//     }
// })
// .then(prompt([
//     {
//         name: 'filePath',
//         type: 'list',
//         message: 'dsdssd',
//         choices: list,
//     }
// ]))

// inquirer.prompt([
//     {
//         name: 'fileName',
//         type: 'list',
//         message: 'Выберите файл',
//         choices: list,
//     }
// ]).then(({ fileName }) => {
//     const filePath = path.join(executionDir, fileName);
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         console.log(data);
//     });
// })
