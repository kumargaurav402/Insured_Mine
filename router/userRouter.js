"use strict";

const userCtrl = require('../controllers/userController');

module.exports = function (app) {


    app.route('/services/user/uploadCSV').post(userCtrl.uploadCSV);

    app.route('/services/user/getPolicy/:username').get(userCtrl.getPolicyInfo);
    app.route('/services/user/aggregatedPolicy/:username').get(userCtrl.aggregatedPolicy);



}