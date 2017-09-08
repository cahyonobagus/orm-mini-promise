const express = require('express')
const router = express.Router()
const Model_projects = require('../models/projects.js')

// routes projects
// /project
//   GET  /list        * menampilkan semua project
//   GET  /add         * form untuk input project  baru
//   POST /add         * untuk handle input project  baru
//   GET  /update/:id  * form untuk update project
//   POST /update/:id  * untuk handle update project
//   GET  /delete/:id  * untuk handle delete project

router.get('/', (req, res) => {
  res.render('project_index')
})


router.get('/list', (req, res) => {
  res.send('data list projects')
})

router.get('/add',(req, res) => {
  res.render('projects_add')
})

router.post('/add',(req, res) => {
  // insert
  let data_projects = {
    nama_project: `${req.body.status}`,
    status: `${req.body.status}`
  }
  Model_projects.create(data_projects)
    .then(string_success => {
      res.redirect('/projects/list')
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/update/:id',(req, res) => {

  // res.render('index')
})

router.get('/update/:id',(req, res) => {
  // res.render('index')
})
//



module.exports = router;
