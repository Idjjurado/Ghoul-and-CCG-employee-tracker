const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('console.table');

init();

function init() {
    const logoText = logo({ name: "CCG Ghouls and Investigators" }).render();

    console.log(logoText);

    allPrompts();
}

function allPrompts {
    prompt([
      {
        type: "list",
        name: "options",
        message: "What classified information would you like to access??",
        choices: [
          {
            name: "View all CCG Investigator departments",
            value: "ALL_CCG_DEPARTMENTS"
          },
          {
            name: "Add a CCG Investigator department",
            value: "ADD_CCG_DEPARTMENTS"
          },
          {
            name: "Remove a CCG Investigator department",
            value: "REMOVE_CCG_DEPARTMENTS"
          },
          {
            name: "View all CCG Investigator roles",
            value: "ALL_CCG_ROLES"
          },
          {
            name: "Add a CCG Investigator role",
            value: "ADD_CCG_ROLES"
          },
          {
            name: "Remove a CCG Investigator role",
            value: "REMOVE_CCG_ROLES"
          },
          {
            name: "View all CCG Employees",
            value: "ALL_CCG_EMPLOYEES"
          },
          {
            name: "Add a CCG Employee",
            value: "ADD_CCG_EMPLOYEES"
          },
          {
            name: "Remove a CCG Employee",
            value: "REMOVE_CCG_EMPLOYEES"
          },
          {
            name: "Update a CCG Employee",
            value: "UPDATE_CCG_EMPLOYEES"
          },
          {
            name: "View CCG Employee's by Manager",
            value: "CCG_EMPLOYEES_MANAGER"
          },
          {
            name: "Update a CCG Employee's Manager",
            value: "UPDATE_CCG_EMPLOYEES_MANAGER"
          },
          {
            name: "UNSEAL CLASSIFIED Ghoul documentation......",
            value: "ALL_GHOULS"
          },
          {
            name: "Report a new high RATED Ghoul......",
            value: "ADD_GHOULS"
          },
          {
            name: "Remove a classified Ghoul......",
            value: "REMOVE_GHOULS"
          },
          {
            name: "Update a classified Ghoul's rating......",
            value: "UPDATE_GHOULS_RATING"
          },
          {
            name: "View all Ghoul's for a specific rating......",
            value: "VIEW_GHOULS_BY_RATING"
          },
          {
            name: "View Total Department Budgets",
            value: "VIEW_DEPARTMENT_BUDGETS"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ]).then(res => {
      let options = res.options;
        switch (options) {
          case "VIEW_DEPARTMENT_BUDGETS":
            viewMoniesForDepartments();
            break;
          case "ALL_CCG_DEPARTMENTS":
            viewAllCCGDepartments();
            break;
          case "ADD_CCG_DEPARTMENTS":
            addCCGDepartment();
            break;
          case "REMOVE_CCG_DEPARTMENTS":
            removeCCGDepartment();
            break;
          case "ALL_CCG_ROLES":
            viewAllCCGRoles();
            break;
          case "ADD_CCG_ROLES":
            addCCGRole();
            break;
          case "REMOVE_CCG_ROLES":
            removeCCGRole();
            break;
          case "ALL_CCG_EMPLOYEES":
            viewAllCCGEmployees();
            break;
          case "ADD_CCG_EMPLOYEES":
            addCCGEmployee();
            break;
          case "REMOVE_CCG_EMPLOYEES":
            removeCCGEmployee();
            break;
          case "CCG_EMPLOYEES_MANAGER":
            viewCCGEmployeeManager();
            break;
          case "UPDATE_CCG_EMPLOYEES_ROLE":
            updateCCGEmployeeRole();
            break;
          case "UPDATE_CCG_EMPLOYEES_MANAGER":
            updateCCGEmployeeManager();
            break;
          case "ALL_GHOULS":
            viewAllGhouls();
            break;
          case "ADD_GHOULS":
            addGhoul();
            break;
          case "REMOVE_GHOULS":
            removeGhoul();
            break;
          case "VIEW_GHOULS_BY_RATING":
            viewGhoulsByRating();
            break;
          case "UPDATE_GHOULS_RATING":
            updateGhoulRating();
            break;
          default:
            quit();
        }
      }
      )
}