const nunjucks = require('nunjucks');
const path = require('path');


const configuration = (app) => {
  nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });

  app.set('view engine', 'njk');
  app.set('views', path.join(__dirname, 'views'));
};

module.exports = app => configuration(app);
