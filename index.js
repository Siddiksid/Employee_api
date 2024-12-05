const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { getAllEmployees, getEmployeeById } = require('./controllers/index.js');
const app = express();
app.use(cors());
app.use(express.json());

const port = 3010;

app.use(express.static('static'));

app.get('/employees', (req, res) => {
  const employees = getAllEmployees();
  res.json({ employees });
});

app.get('/employees/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let employee = getEmployeeById(id);
  res.json({ employee });
});

module.exports = { app };
