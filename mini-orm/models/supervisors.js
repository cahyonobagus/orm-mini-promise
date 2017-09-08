const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');
const Model_projects = require('./projects.js')

class Supervisors {
  constructor(obj) {
    this.id = obj.id;
    this.nama = obj.nama;
    this.email = obj.email;
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM supervisors`, (err, rows_supervisors) => {
        if(!err){
          let supervisors = rows_supervisors.map(p => new Supervisors(p))
          resolve(supervisors)
        } else {
          reject(err)
        }
      })
    })
  }

  // static get_supervisors_and_project(){
  //   return new Promise((resolve, reject) => {
  //     this.findAll()
  //       .then( supervisors => {
  //         supervisors.forEach( supervisor => {
  //           supervisor.get_project((projects) => {
  //             if(projects.length > 0){
  //               supervisor.projects = projects;
  //             } else {
  //               console.log('data not found');
  //             }
  //
  //
  //           })
  //         })
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   })
  //
  //
  // }

  get_project(callback){
    Model_projects.findWhere('spv_id', this.id)
      .then(projects => {
        callback(projects);
      })
      .catch(err => {
        console.log(err);
      })
  }



  static findById(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM supervisors WHERE id = ${id}`, (err, supervisors) => {
        if(!err){
          resolve(supervisors)
        } else {
          reject(err)
        }
      })
    })
  }

  static findWhere(field, value) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM supervisors WHERE ${field} = ${value}`, (err, supervisors) => {
        if(!err){
          resolve(supervisors)
        } else {
          reject(err)
        }
      })
    })

  }


  static create(data_supervisors) {
    //insert
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO supervisors (nama,email)
        VALUES ('${data_supervisors.nama}','${data_supervisors.email}')`, (err) => {
        if(!err){
          resolve('INSERT SUCCESS')
        } else {
          reject(err)
        }
      })
    })
  }

  static update(data_supervisors) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE supervisors SET
        nama = '${data_supervisors.nama}',
        email = '${data_supervisors.email}'
        WHERE id = ${data_supervisors.id}`
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

  static destroy(id) {
    //delete
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM supervisors WHERE id = ${id}`
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



module.exports = Supervisors
