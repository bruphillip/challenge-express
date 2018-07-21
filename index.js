const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

app.use(bodyParser.urlencoded({ urlencoded: false }))
require('./nunjucks')(app);

const middleware = (req, res, next) => {
  const { nome } = req.query;
  if (nome) {
    next();
  } else {
    res.redirect('/');
  }
};

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { nome, dataNasc } = req.body;
  const idade = moment().diff(moment(dataNasc, 'DD/MM/YYYY'), 'years');
  if (idade > 18) {
    res.redirect(`/major?nome=${nome}`);
  } else {
    res.redirect(`/minor?nome=${nome}`);
  }
});

app.get('/major', middleware, (req, res) => {
  const { nome } = req.query;
  res.render('major', { nome });
});

app.get('/minor', middleware, (req, res) => {
  const { nome } = req.query;
  res.render('minor', { nome });
});


app.listen(3000);
