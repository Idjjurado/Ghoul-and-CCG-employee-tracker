const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // Find all Investigators, join with roles and departments to display all info
  findAllCCG() {
    return this.connection.promise().query(
      "SELECT ccg_employees.id, ccg_employees.first_name, ccg_employees.last_name, ccg_roles.title, ccg_departments.name AS ccg_departments, ccg_roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM ccg_employees LEFT JOIN ccg_roles on ccg_employees.role_id = ccg_roles.id LEFT JOIN ccg_departments on ccg_roles.department_id = ccg_departments.id LEFT JOIN ccg_employees manager on manager.id = ccg_employees.manager_id;"
    );
  }

// Find all Ghouls and their ratings
  findAllGhouls() {
    return this.connection.promise().query(
      "SELECT ccg_ghouls.id, ccg_ghouls.name, ccg_ghoulratings.classification FROM ccg_ghouls LEFT JOIN ccg_ghoulratings on ccg_ghouls.rating_id = ccg_ghoulratings.id;"
    );
  }

  findAllPossibleManagers(CCGemployeeId) {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM ccg_employees WHERE id != ?",
      CCGemployeeId
    );
  }

  createCCGEmployee(CCGemployee) {
    return this.connection.promise().query("INSERT INTO ccg_employees SET ?", CCGemployee);
  }

  removeEmployee(CCGemployeeId) {
    return this.connection.promise().query(
      "DELETE FROM ccg_employees WHERE id = ?",
      CCGemployeeId
    );
  }

  updateEmployeeRole(CCGemployeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE ccg_employees SET role_id = ? WHERE id = ?",
      [roleId, CCGemployeeId]
    );
  }

  updateEmployeeManager(CCGemployeeId, managerId) {
    return this.connection.promise().query(
      "UPDATE ccg_employees SET manager_id = ? WHERE id = ?",
      [managerId, CCGemployeeId]
    );
  }

  findAllCCGRoles() {
    return this.connection.promise().query(
      "SELECT ccg_roles.id, ccg_roles.title, ccg_departments.name AS ccg_departments, ccg_roles.salary FROM ccg_roles LEFT JOIN ccg_departments on ccg_roles.department_id = ccg_departments.id;"
    );
  }

  createRole(CCGrole) {
    return this.connection.promise().query("INSERT INTO ccg_roles SET ?", CCGrole);
  }

  removeRole(CCGroleId) {
    return this.connection.promise().query("DELETE FROM ccg_roles WHERE id = ?", CCGroleId);
  }

  findAllCCGDepartments() {
    return this.connection.promise().query(
      "SELECT ccg_departments.id, ccg_departments.name FROM ccg_departments;"
    );
  }

  viewDepartmentBudgets() {
    return this.connection.promise().query(
      "SELECT ccg_departments.id, ccg_departments.name, SUM(ccg_roles.salary) AS utilized_budget FROM ccg_employees LEFT JOIN ccg_roles on ccg_employees.role_id = ccg_roles.id LEFT JOIN ccg_departments on ccg_roles.department_id = ccg_departments.id GROUP BY ccg_departments.id, ccg_departments.name;"
    );
  }

  createDepartment(CCGdepartment) {
    return this.connection.promise().query("INSERT INTO ccg_departments SET ?", CCGdepartment);
  }

  removeDepartment(CCGdepartmentId) {
    return this.connection.promise().query(
      "DELETE FROM ccg_departments WHERE id = ?",
      CCGdepartmentId
    );
  }

  findAllEmployeesByDepartment(CCGdepartmentId) {
    return this.connection.promise().query(
      "SELECT ccg_employees.id, ccg_employees.first_name, ccg_employees.last_name, ccg_roles.title FROM ccg_employees LEFT JOIN ccg_roles on ccg_employees.role_id = ccg_roles.id LEFT JOIN ccg_departments ccg_departments on ccg_roles.department_id = ccg_departments.id WHERE ccg_departments.id = ?;",
      CCGdepartmentId
    );
  }

  findAllEmployeesByManager(CCGmanagerId) {
    return this.connection.promise().query(
      "SELECT ccg_employees.id, ccg_employees.first_name, ccg_employees.last_name, ccg_departments.name AS ccg_departments, ccg_roles.title FROM ccg_employees LEFT JOIN ccg_roles on ccg_roles.id = ccg_employees.role_id LEFT JOIN ccg_departments ON ccg_departments.id = ccg_roles.department_id WHERE manager_id = ?;",
      CCGmanagerId
    );
  }
}

module.exports = new DB(connection);
