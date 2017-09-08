const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');


db.serialize(()=> {
  db.run(`CREATE TABLE supervisors
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nama VARCHAR(255),
          email VARCHAR(255)
        )`, ()=> {
          console.log('succes create table supervisors');
        })


  let sql = `CREATE TABLE projects
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nama_project VARCHAR(255),
              status VARCHAR(255),
              spv_id INTEGER,
              FOREIGN KEY (spv_id) REFERENCES supervisors(id)
            )`
  db.run(sql, ()=> {
    console.log('success create table projects');
  })

})
