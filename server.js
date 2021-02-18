const express = require(`express`);
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: `localhost`,
  port: 3306,
  user: `root`,
  password: `Emmamarie1`,
  database: `EmployeeManagement_db`,
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
      console.log("this is the answer: " + answer.addingWhat);

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
        }
      );
    });
}

function getDepartments() {
  connection.query(`SELECT * FROM  department`, (err, result) => {
    if (err) throw err;
    console.table(result);
    return result;
  });
}

function addRole() {
  console.log("adding role");

  const departments = getDepartments();
  console.log(departments);

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
        choices: [...result.name],
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [answer.title, answer.salary, answer.department],
        (err, result) => {
          if (err) throw err;
          console.log(`role added`);
        }
      );
    });
}

function addEmployee() {
  connection.query(`SELECT title, id FROM role`, (err, result) => {
    if (err) throw err;
    console.log(`roles: ${result.title}`);
  });

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
        choices: [...result.title],
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO Employee (first_name, last_name, role_id) VALUE (?,?,?)`,
        [answer.firstName, answer.lastName, answer.role],
        (err, result) => {
          if (err) throw err;
          console.log(`Employee added!`);
        }
      );
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
