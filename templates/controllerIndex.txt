const defaultCtrl = require('./default');

module.exports = (app) => {
  userCtrl(app);
  defaultCtrl(app);
};