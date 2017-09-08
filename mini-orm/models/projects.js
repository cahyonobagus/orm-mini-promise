const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');


class Projects {
  constructor(obj) {
    this.id = obj.id;
    this.nama_project = obj.nama_project;
    this.status = obj.status;
    this.spv_id = obj.spv_id;
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.run(`SELECT * FROM projects`, (err, rows_projects) => {
        if(!err){
          let projects = rows_projects.map(p => new Projects(p))
          resolve(projects)
        } else {
          reject(err)
        }
      })
    })
  }

  static findById() {}

  static findWhere() {}

  static create() {}

  static update() {}

  static destroy() {}

}
