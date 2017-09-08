const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

// require rfile routes
let index = require('./routes/index.js')
let projects = require('./routes/projects.js')
// let supervisors = require('./routes/supervisors.js')

// routing
app.use('/', index);
app.use('/projects', projects);
// app.use('/supervisors', supervisors);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
