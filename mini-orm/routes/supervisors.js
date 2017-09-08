const express = require('express')
const router = express.Router()
const Model_supervisors = require('../models/supervisors.js')
const Model_projects = require('./projects.js')

// routes projects
// /project
//   GET  /list        * menampilkan semua project
//   GET  /add         * form untuk input project  baru
//   POST /add         * untuk handle input project  baru
//   GET  /update/:id  * form untuk update project
//   POST /update/:id  * untuk handle update project
//   GET  /delete/:id  * untuk handle delete project

router.get('/', (req, res) => {
  res.render('supervisors_index')
})

router.get('/list', (req, res) => {
  Model_supervisors.findAll()
    .then(data_supervisors => {
      res.render('supervisors_list', {data_supervisors: data_supervisors})
    })
    .catch(err => {
      console.log(err);
    })
})


// router.get('/:id/asign_project', (req, res) => {
//   // res.send('ok')
//   Model_supervisors.findAll()
//     .then(supervisors => {
//
//       Model_projects.findById(supervisors.id)
//     })
//     .catch(err){
//       console.log(err);
//     }
//   // res.render('supervisors_index')
// })





router.get('/add',(req, res) => {
  res.render('supervisors_add')
})

router.post('/add',(req, res) => {
  // insert
  let data_supervisors = {
    nama: `${req.body.nama}`,
    email: `${req.body.email}`
  }
  Model_supervisors.create(data_supervisors)
    .then(string_success => {
      res.redirect('/supervisors/list')
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/update/:id',(req, res) => {
  Model_supervisors.findById(req.params.id)
    .then(supervisors => {
      res.render('supervisors_edit', {data_supervisors : supervisors})
    })
    .catch(err => {
      console.log(err);
    })

})

router.post('/update/:id',(req, res) => {
  let data_supervisors = {
    id: `${req.params.id}`,
    nama: `${req.body.nama}`,
    email: `${req.body.email}`
  }
  Model_supervisors.update(data_supervisors)
    .then(string_success => {
      res.redirect('/supervisors/list')
    })
    .catch(err => {
      console.log(err);
    })
})
//

router.get('/delete/:id',(req, res) => {
  Model_supervisors.destroy(req.params.id)
    .then(string_success => {
      res.redirect('/supervisors/list')
    })
    .catch(err => {
      console.log(err);
    })

})

module.exports = router;
