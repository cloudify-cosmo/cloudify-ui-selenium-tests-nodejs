


exports.config = require('./config');

exports.driver = require('./driver');
exports.driver.generate(exports.config.selenium);
exports.ui = require('./ui');
