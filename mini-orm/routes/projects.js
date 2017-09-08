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
  Model_projects.findAll()
    .then(data_projects => {
      res.render('project_list', {data_projects: data_projects})
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/add',(req, res) => {
  res.render('projects_add')
})

router.post('/add',(req, res) => {
  // insert
  let data_projects = {
    nama_project: `${req.body.nama_project}`,
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
  Model_projects.findById(req.params.id)
    .then(project => {
      // res.send(project)
      res.render('project_edit', {data_project : project})
    })
    .catch(err => {
      console.log(err);
    })

})

router.post('/update/:id',(req, res) => {
  let data_projects = {
    id: `${req.params.id}`,
    nama_project: `${req.body.nama_project}`,
    status: `${req.body.status}`
  }
  Model_projects.update(data_projects)
    .then(string_success => {
      res.redirect('/projects/list')
    })
    .catch(err => {
      console.log(err);
    })
})
//



module.exports = router;
