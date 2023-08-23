const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  viewMoniesForDepartments() {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_departments.id, ccg_departments.name, SUM(ccg_roles.salary) AS utilized_budget FROM ccg_employees LEFT JOIN ccg_roles on ccg_employees.role_id = ccg_roles.id LEFT JOIN ccg_departments on ccg_roles.department_id = ccg_departments.id GROUP BY ccg_departments.id, ccg_departments.name;",
      );
  }

  viewAllCCGDepartments() {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_departments.id, ccg_departments.name FROM ccg_departments;",
      );
  }

  addCCGDepartment(CCGdepartment) {
    return this.connection
      .promise()
      .query("INSERT INTO ccg_departments SET ?", CCGdepartment);
  }

  removeCCGDepartment(CCGdepartmentId) {
    return this.connection
      .promise()
      .query("DELETE FROM ccg_departments WHERE id = ?", CCGdepartmentId);
  }

  viewAllCCGRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_roles.id, ccg_roles.title, ccg_departments.name AS ccg_departments, ccg_roles.salary FROM ccg_roles LEFT JOIN ccg_departments on ccg_roles.department_id = ccg_departments.id;",
      );
  }

  addCCGRole(CCGrole) {
    return this.connection
      .promise()
      .query("INSERT INTO ccg_roles SET ?", CCGrole);
  }

  removeCCGRole(CCGroleId) {
    return this.connection
      .promise()
      .query("DELETE FROM ccg_roles WHERE id = ?", CCGroleId);
  }

  viewAllCCGEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_employees.id, ccg_employees.first_name, ccg_employees.last_name, ccg_roles.title, ccg_departments.name AS ccg_departments, ccg_roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM ccg_employees LEFT JOIN ccg_roles on ccg_employees.role_id = ccg_roles.id LEFT JOIN ccg_departments on ccg_roles.department_id = ccg_departments.id LEFT JOIN ccg_employees manager on manager.id = ccg_employees.manager_id;",
      );
  }

  addCCGEmployee(CCGemployee) {
    return this.connection
      .promise()
      .query("INSERT INTO ccg_employees SET ?", CCGemployee);
  }

  removeCCGEmployee(CCGemployeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM ccg_employees WHERE id = ?", CCGemployeeId);
  }

  viewCCGEmployeeManager(CCGmanagerId) {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_employees.id, ccg_employees.first_name, ccg_employees.last_name, ccg_departments.name AS ccg_departments, ccg_roles.title FROM ccg_employees LEFT JOIN ccg_roles on ccg_roles.id = ccg_employees.role_id LEFT JOIN ccg_departments ON ccg_departments.id = ccg_roles.department_id WHERE manager_id = ?;",
        CCGmanagerId,
      );
  }

  updateCCGEmployeeRole(CCGemployeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE ccg_employees SET role_id = ? WHERE id = ?", [
        roleId,
        CCGemployeeId,
      ]);
  }

  updateCCGEmployeeManager(CCGemployeeId, managerId) {
    return this.connection
      .promise()
      .query("UPDATE ccg_employees SET manager_id = ? WHERE id = ?", [
        managerId,
        CCGemployeeId,
      ]);
  }

  findAllCCGEmployeesByDepartment(CCGdepartmentId) {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_employees.id, ccg_employees.first_name, ccg_employees.last_name, ccg_roles.title FROM ccg_employees LEFT JOIN ccg_roles on ccg_employees.role_id = ccg_roles.id LEFT JOIN ccg_departments ccg_departments on ccg_roles.department_id = ccg_departments.id WHERE ccg_departments.id = ?;",
        CCGdepartmentId,
      );
  }

  viewAllGhouls() {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_ghouls.id, ccg_ghouls.name, ccg_ghouls.kagune, ccg_ghoulratings.classification FROM ccg_ghouls LEFT JOIN ccg_ghoulratings on ccg_ghouls.rating_id = ccg_ghoulratings.id;",
      );
  }

  addGhoul(ghoul) {
    return this.connection
      .promise()
      .query("INSERT INTO ccg_ghouls SET ?", ghoul);
  }

  removeGhoul(ghoulId) {
    return this.connection
      .promise()
      .query("DELETE FROM ccg_ghouls WHERE id = ?", ghoulId);
  }

  viewGhoulsByRating(CCGghoulRatingId) {
    return this.connection
      .promise()
      .query(
        "SELECT ccg_ghouls.id, ccg_ghouls.name, ccg_ghouls.kagune, ccg_ghoulratings.classification FROM ccg_ghouls LEFT JOIN ccg_ghoulratings on ccg_ghouls.rating_id = ccg_ghoulratings.id WHERE ccg_ghoulratings.id = ?;",
        CCGghoulRatingId,
      );
  }

  updateGhoulRating(ghoulId, ratingId) {
    return this.connection
      .promise()
      .query("UPDATE ccg_ghouls SET rating_id = ? WHERE id = ?", [
        ratingId,
        ghoulId,
      ]);
  }

  findAllPossibleManagers(CCGemployeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM ccg_employees WHERE id != ?",
        CCGemployeeId,
      );
  }

  viewAllRatings() {
    return this.connection
      .promise()
      .query(
        "SELECT * FROM ccg_ghoulratings ORDER BY id;",
      );
  }
}

module.exports = new DB(connection);
