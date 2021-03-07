const express = require(`express`);
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: `localhost`,
  port: 3306,
  user: `root`,
  password: process.env.DBPASSWORD,
  database: `employeeManagement_db`,
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

function beginningPrompt() {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `command`,
        message: `select what you would like to do`,
        choices: [`Add`, `View`, `Update`, "Delete"],
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
        case "Delete":
          mDelete();
          break;
      }
    });
}

function askAgain() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Would you like to continue?",
        choices: ["YES", "NO"],
      },
    ])
    .then((answer) => {
      if (answer.choice === "YES") {
        beginningPrompt();
      } else return;
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
      switch (answer.addingWhat) {
        case "Department":
          addDepartment();
          break;
        case "Role":
          addRole();
          break;
        case "Employee":
          addEmployee();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: `input`,
        name: `input`,
        message: `Enter new Department`,
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO department SET ?`,
        { name: answer.input },
        (err, result) => {
          if (err) throw err;
          console.log(`input added!`);
          askAgain();
        }
      );
    });
}

function addRole() {
  connection.query(`SELECT name FROM  department`, (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: `input`,
          name: `title`,
          message: `Enter new Role title`,
        },
        {
          type: `input`,
          name: `salary`,
          message: `Enter Role's salary`,
        },
        {
          type: `list`,
          name: `department`,
          message: `Select which department this role is apart of.`,
          choices: [...result],
        },
      ])
      .then((answer) => {
        connection.query(
          `SELECT id FROM department WHERE name = "${answer.department}"`,
          (err, res) => {
            console.log(res[0].id);

            connection.query(
              `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
              [answer.title, answer.salary, res[0].id],
              (err, result) => {
                if (err) throw err;
                console.log(`role added`);
                askAgain();
              }
            );
          }
        );
      });
  });
}

function addEmployee() {
  connection.query(`SELECT title FROM role`, (err, result) => {
    if (err) throw err;
    console.log(JSON.stringify(result));
    inquirer
      .prompt([
        {
          type: `input`,
          name: `firstName`,
          message: `Enter employee's first name`,
        },
        {
          type: `input`,
          name: `lastName`,
          message: `Enter employee's last name`,
        },
        {
          type: `list`,
          name: `role`,
          message: `select which role employee would have`,
          choices: [...result],
        },
      ])
      .then((answers) => {
        connection.query(
          `SELECT id FROM role WHERE title = ${answers.role}`,
          (err, res) => {
            if (err) throw err;

            connection.query(
              `INSERT INTO Employee (first_name, last_name, role_id) VALUE (?,?,?)`,
              [answer.firstName, answer.lastName, res],
              (err, result) => {
                if (err) throw err;
                console.log(`Employee added!`);
                askAgain();
              }
            );
          }
        );
      });
  });
}

function view() {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `viewingWhat`,
        message: `What would you like to view?`,
        choices: [`department`, `role`, `employee`],
      },
    ])
    .then((answer) => {
      connection.query(`SELECT * FROM ${answer.viewingWhat}`, (err, res) => {
        console.table(res);
        askAgain();
      });
    });
}

function update() {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `updatingWhat`,
        message: `What would you like to update?`,
        choices: [`Department`, `Role`, `Employee`],
      },
    ])
    .then((answer) => {
      switch (answer.updatingWhat) {
        case "Department":
          updateDepartment();
          break;
        case "Role":
          updateRole();
          break;
        case "Employee":
          updateEmployee();
          break;
      }

      askAgain();
    });
}

function updateDepartment() {
  connection.query("SELECT name FROM department", (err, result) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "update",
          message: "Select a department to udpate",
          choices: [...result],
        },
        {
          type: "input",
          name: "updated",
          message: "Rename department to: ",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO department (name) WHERE ? VALUE (?)",
          [{ name: answer.update }, answer.updated],
          (err, res) => {
            console.log("Department updated!");
            askAgain();
          }
        );
      });
  });
}

function updateRole() {
  connection.query("SELECT title FROM role", (err, result) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "update",
          message: "Select which role to udpate",
          choices: [...result],
        },
        {
          type: "input",
          name: "updated",
          message: "Rename role title to: ",
        },
        {
          type: "input",
          name: "updatedSalary",
          message: "Update roles salary: ",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO role (title, salary) WHERE ? VALUE (?, ?)",
          [{ title: answer.update }, answer.updated, answer.updatedSalary],
          (err, res) => {
            console.log("Role updated!");
            askAgain();
          }
        );
      });
  });
}

function updateEmployee() {
  connection.query("SELECT first_name FROM employee", (err, result) => {
    if (err) throw err;
    connection.query("SELECT title FROM role", (err, roleList) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "update",
            message: "Select an Employee to udpate",
            choices: [...result],
          },
          {
            type: "input",
            name: "updatedFirst",
            message: "Update first name: ",
          },
          {
            type: "input",
            name: "updatedLast",
            message: "Update last name: ",
          },
          {
            type: "list",
            name: "updatedRole",
            message: "Select Employee's role",
            choices: [...roleList],
          },
        ])
        .then((answer) => {
          connection.query(
            "INSERT INTO employee (first_name, last_name, role) WHERE ? VALUE (?, ?, ?)",
            [
              { first_name: answer.update },
              answer.updatedFirst,
              answer.updatedLast,
              answer.updated,
            ],
            (err, res) => {
              console.log("Employee updated!");
              askAgain();
            }
          );
        });
    });
  });
}

function mDelete() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteWhat",
        message: "What would you like to delete?",
        choices: ["department", "role", "employee"],
      },
    ])
    .then((answer) => {
      switch (answer.deleteWhat) {
        case "department":
          deleteDepartment();
          break;
        case "role":
          deleteRole();
          break;
        case "employee":
          break;
      }
    });
}

function deleteDepartment() {
  connection.query("SELECT name FROM department", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "deletingWhat",
          message: "Select which department you would like to delete.",
          choices: [...res],
        },
      ])
      .then((answer) => {
        connection.query(
          `DELETE FROM department WHERE name = "${answer.deletingWhat}"`,
          (err, res) => {
            console.log("Department Deleted!");
            askAgain();
          }
        );
      });
  });
}

function deleteRole() {
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "deletingWhat",
          message: "Select which role you would like to delete.",
          choices: [...res],
        },
      ])
      .then((answer) => {
        connection.query(
          'DELETE FROM role WHERE title = "?"',
          answer.deleteWhat,
          (err, res) => {
            console.log("Role Delted!");
            askAgain();
          }
        );
      });
  });
}

function deleteEmployee() {
  connection.query("SELECT last_name FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "deleteWhat",
          message: "Select which employee to remove by last name.",
          choices: [...res],
        },
      ])
      .then((answer) => {
        connection.query(
          `DELETE FROM employee WHERE last_name = "?"`,
          answer.deleteWhat,
          (err, res) => {
            console.log("Employee Deleted!");
            askAgain();
          }
        );
      });
  });
}

beginningPrompt();
