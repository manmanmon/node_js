#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// const readline = require('readline');
const inquirer = require('inquirer');

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
const isFile = (path) => fs.lstatSync(path).isFile();
const list = fs.readdirSync(executionDir).filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list',
        message: 'Выберите файл',
        choices: list,
    }
]).then(({ fileName }) => {
    const filePath = path.join(executionDir, fileName);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        console.log(data);
    });
})


