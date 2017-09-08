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
      db.all(`SELECT * FROM projects`, (err, rows_projects) => {
        if(!err){
          let projects = rows_projects.map(p => new Projects(p))
          resolve(projects)
        } else {
          reject(err)
        }
      })
    })
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM projects WHERE id = ${id}`, (err, projects) => {
        if(!err){
          resolve(projects)
        } else {
          reject(err)
        }
      })
    })
  }

  static find_where(field, value) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM projects WHERE ${field} = ${value}`, (err, projects) => {
        if(!err){
          resolve(projects)
        } else {
          reject(err)
        }
      })
    })

  }


  static create(data_projects) {
    //insert
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO projects (nama_project,status)
        VALUES ('${data_projects.nama_project}','${data_projects.status}')`, (err) => {
        if(!err){
          resolve('INSERT SUCCESS')
        } else {
          reject(err)
        }
      })
    })
  }

  static update(data_projects) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE projects SET
        nama_project = '${data_projects.nama_project}',
        status = '${data_projects.status}'
        WHERE id = ${data_projects.id}`
      // console.log(sql);
      db.run(sql, (err) => {
        if(!err){
          resolve('UPDATE SUCCESS')
        } else {
          reject(err)
        }
      })
    })
  }

  static assign_spv_id(data_projects) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE projects SET
        spv_id = ${data_projects.spv_id}
        WHERE id = ${data_projects.id}`
      // console.log(sql);
      db.run(sql, (err) => {
        if(!err){
          resolve('ASSIGN SUCCESS')
        } else {
          reject(err)
        }
      })
    })
  }

  static destroy(id) {
    //delete
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM projects WHERE id = ${id}`
      // console.log(sql);
      db.run(sql, (err) => {
        if(!err){
          resolve('DELETE SUCCESS')
        } else {
          reject(err)
        }
      })
    })



  }

}



module.exports = Projects
