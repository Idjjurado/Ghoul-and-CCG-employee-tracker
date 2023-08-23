const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

function init() {
  const logoText = logo({ name: "CCG Ghouls and Investigators" }).render();

  console.log(logoText);

  allPrompts();
}

function allPrompts() {
  prompt([
    {
      type: "list",
      name: "options",
      message: "What classified information would you like to access??",
      choices: [
        {
          name: "View all CCG Investigator departments",
          value: "ALL_CCG_DEPARTMENTS",
        },
        {
          name: "Add a CCG Investigator department",
          value: "ADD_CCG_DEPARTMENTS",
        },
        {
          name: "Remove a CCG Investigator department",
          value: "REMOVE_CCG_DEPARTMENTS",
        },
        {
          name: "View all CCG Investigator roles",
          value: "ALL_CCG_ROLES",
        },
        {
          name: "Add a CCG Investigator role",
          value: "ADD_CCG_ROLES",
        },
        {
          name: "Remove a CCG Investigator role",
          value: "REMOVE_CCG_ROLES",
        },
        {
          name: "View all CCG Employees",
          value: "ALL_CCG_EMPLOYEES",
        },
        {
          name: "Add a CCG Employee",
          value: "ADD_CCG_EMPLOYEES",
        },
        {
          name: "Remove a CCG Employee",
          value: "REMOVE_CCG_EMPLOYEES",
        },
        {
          name: "Update a CCG Employee",
          value: "UPDATE_CCG_EMPLOYEES",
        },
        {
          name: "View CCG Employee's by Manager",
          value: "CCG_EMPLOYEES_MANAGER",
        },
        {
          name: "Update a CCG Employee's Manager",
          value: "UPDATE_CCG_EMPLOYEES_MANAGER",
        },
        {
          name: "View all Ghoul Ratings",
          value: "VIEW_ALL_GHOUL_RATINGS",
        },
        {
          name: "UNSEAL CLASSIFIED Ghoul documentation......",
          value: "ALL_GHOULS",
        },
        {
          name: "Report a new high RATED Ghoul......",
          value: "ADD_GHOULS",
        },
        {
          name: "Remove a classified Ghoul......",
          value: "REMOVE_GHOULS",
        },
        {
          name: "Update a classified Ghoul's rating......",
          value: "UPDATE_GHOULS_RATING",
        },
        {
          name: "View all Ghoul's for a specific rating......",
          value: "VIEW_GHOULS_BY_RATING",
        },
        {
          name: "View Total Department Budgets",
          value: "VIEW_DEPARTMENT_BUDGETS",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
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
      case "VIEW_ALL_GHOUL_RATINGS":
        viewAllRatings();
        break;
      default:
        quit();
    }
  });
}

// View all CCG Investigator departments budgetary spending on salaries
function viewMoniesForDepartments() {
  db.viewMoniesForDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => allPrompts());
}

// View all CCG Investigator departments
function viewAllCCGDepartments() {
  db.viewAllCCGDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => allPrompts());
}

// Add a CCG Investigator department
function addCCGDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the new CCG Investigator department?",
    },
  ]).then((res) => {
    let name = res;
    db.addCCGDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => allPrompts());
  });
}

// Remove a CCG Investigator department
function removeCCGDepartment() {
  db.removeCCGDepartment().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
      choices: departmentChoices,
    })
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log(`Removed department from the database`))
      .then(() => allPrompts());
  });
}

// View all CCG Investigator roles
function viewAllCCGRoles() {
  db.viewAllCCGRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => allPrompts());
}

// Add a CCG Investigator role
function addCCGRole() {
  db.viewAllCCGDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => allPrompts());
    });
  });
}

// Remove a CCG Investigator role
function removeCCGRole() {
  db.viewAllCCGRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which role do you want to remove? (Warning: This will also remove employees)",
        choices: roleChoices,
      },
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("Removed role from the database"))
      .then(() => allPrompts());
  });
}

// View all CCG Employees
function viewAllCCGEmployees() {
  db.viewAllCCGEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => allPrompts());
}

// Add a CCG Employee
function addCCGEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.viewAllCCGRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        db.viewAllCCGEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }),
          );

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              db.addCCGEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`),
            )
            .then(() => allPrompts());
        });
      });
    });
  });
}

// Remove a CCG Employee
function removeCCGEmployee() {
  db.viewAllCCGEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeCCGEmployee(res.employeeId))
      .then(() => console.log("Removed employee from the database"))
      .then(() => allPrompts());
  });
}

// Update a CCG Employee's role
function updateCCGEmployeeRole() {
  db.viewAllCCGEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.viewAllCCGRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices,
          },
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Updated employee's role"))
          .then(() => allPrompts());
      });
    });
  });
}

// Update a CCG Employee's manager
function updateCCGEmployeeManager() {
  db.viewAllCCGEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllPossibleManagers(employeeId).then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(
          ({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }),
        );

        prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices,
          },
        ])
          .then((res) => db.updateCCGEmployeeManager(employeeId, res.managerId))
          .then(() => console.log("Updated employee's manager"))
          .then(() => allPrompts());
      });
    });
  });
}

// View CCG Employee's by Manager
function viewCCGEmployeeManager() {
  db.viewAllCCGEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see direct reports for?",
        choices: managerChoices,
      },
    ])
      .then((res) => db.viewCCGEmployeeManager(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("The selected employee has no direct reports");
        } else {
          console.table(employees);
        }
      })
      .then(() => allPrompts());
  });
}

// View all Ghouls
function viewAllGhouls() {
  db.viewAllGhouls()
    .then(([rows]) => {
      let employees = rows;
      console.table("\n");
      console.table(employees);
    })
    .then(() => allPrompts());
}

// Add a Ghoul
function addGhoul() {
  db.viewAllGhoulRatings().then(([rows]) => {
    let Ratings = rows;
    const ghoulRatings = Ratings.map(({ id, classification }) => ({
      classification: classification,
      value: id,
    }));

    prompt([
      {
        name: "name",
        message: "What is the name of the role?",
      },
      {
        name: "kagune",
        message: "What type of Kagune does the ghoul have?",
      },
      {
        type: "list",
        name: "rating_id",
        message: "What rating should the Ghoul have?",
        choices: ghoulRatings,
      },
    ]).then((ghoul) => {
      db.addGhoul(ghoul)
        .then(() => console.log(`Added ${ghoul.name} to the database`))
        .then(() => allPrompts());
    });
  });
}

// Remove a Ghoul
function removeGhoul() {
  db.viewAllGhouls().then(([rows]) => {
    let ghouls = rows;
    const ghoulChoices = ghouls.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "ghoulId",
        message: "Which ghoul do you want to remove?",
        choices: ghoulChoices,
      },
    ])
      .then((res) => db.removeGhoul(res.ghoulId))
      .then(() => console.log("Removed Ghoul from the database"))
      .then(() => allPrompts());
  });
}

// Exit the application
function quit() {
  console.log("Forget all you have seen here.....");
  process.exit();
}
