const express = require(`express`);
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function beginningPrompt() {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `command`,
        message: `select what you would like to do`,
        choices: [`Add`, `View`, `Update`],
      },
    ])
    .then((answer) => {
      switch (answer.command) {
        case `Add`:
          add();
          break;
        case `View`:
          view();
          break;
        case `Update`:
          update();
          break;
      }
    });
}

function add() {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `addingWhat`,
        message: `What would you like to add?`,
        choices: [`Department`, `Role`, `Employee`],
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
}

function view() {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `viewingWhat`,
        message: `What would you like to view?`,
        choices: [`Departments`, `Roles`, `Employees`],
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
}

function update() {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `updatingWhat`,
        message: `What would you like to update?`,
        choices: [`Departments`, `Roles`, `Employees`],
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
}

beginningPrompt();
