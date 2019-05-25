"use strict";

const path = require('path');
const Agent = require('../models/agent');
const Policy_Info = require('../models/policy_info');
const Policy_Category = require('../models/policy_category');
const policy_carrier = require('../models/policy_carrier');
const User = require('../models/user');
const csv = require('csvtojson')
const shortid = require('shortid');


//API to upload the attached CSV data into Mongodb Starts here//
exports.uploadCSV = (req, res, next) => {
    let csvFilePath = path.join(__dirname + '/../uploads/Sample.csv');
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.map(map => {
                map.user_id = shortid.generate();
                return map;
            })
            return jsonObj;
        }).then(response => {
            let agentDoc = new Promise((resolve, reject) => {
                let doc = response.map(val => {
                    let doc = {};
                    doc.user_id = val.user_id;
                    doc.Agent_Name = val.agent;
                    return doc;
                })
                Agent.insertMany(doc)
                    .then(result_agent => {
                        resolve(result_agent);
                    }).catch(err => {
                        reject(err);
                    })
            });

            let policycarrierDoc = new Promise((resolve, reject) => {
                let doc = response.map(val => {
                    let doc = {};
                    doc.user_id = val.user_id;
                    doc.company_name = val.company_name;
                    return doc;
                })
                policy_carrier.insertMany(doc)
                    .then(result_agent => {
                        resolve(result_agent);
                    }).catch(err => {
                        reject(err);
                    })
            });

            let ProfileCategoryDoc = new Promise((resolve, reject) => {
                let doc = response.map(val => {
                    let doc = {};
                    doc.user_id = val.user_id;
                    doc.category_name = val.category_name;
                    return doc;
                })
                Policy_Category.insertMany(doc)
                    .then(result_agent => {
                        resolve(result_agent);
                    }).catch(err => {
                        reject(err);
                    })
            });

            let policyinfoDoc = new Promise((resolve, reject) => {
                let doc = response.map(val => {
                    let doc = {};
                    doc.user_id = val.user_id;
                    doc.policy_number = val.policy_number;
                    doc.email = val.email;
                    doc.gender = val.gender;
                    return doc;
                })
                Policy_Info.insertMany(doc)
                    .then(result_agent => {
                        resolve(result_agent);
                    }).catch(err => {
                        reject(err);
                    })
            });

            let UserDoc = new Promise((resolve, reject) => {
                let doc = response.map(val => {
                    let doc = {};
                    doc.user_id = val.user_id;
                    doc.firstname = val.firstname;
                    doc.address = val.address;
                    doc.phone_number = val.phone_number;
                    doc.state = val.state;
                    doc.zip_code = val.zip_code;
                    doc.email = val.email;
                    doc.user_Type = val.user_Type;
                    return doc;
                })
                User.insertMany(doc)
                    .then(result_agent => {
                        resolve(result_agent);
                    }).catch(err => {
                        reject(err);
                    })
            });

            Promise.all([agentDoc, policycarrierDoc, ProfileCategoryDoc, policyinfoDoc, UserDoc]).then(result => {
                res.json({
                    success: true,
                    msg: 'csv uploaded'
                })
            }).catch(err => {
                next(err);
            })
        }).catch(err => {
            next(err);
        })
}
//API to upload the attached CSV data into Mongodb ENDS here//




//API to find policy info with the help of username STARTS Here//
exports.getPolicyInfo = async (req, res, next) => {
    try {
        let user = await User.findOne({ firstname: req.params.username });
        let policy = await Policy_Info.findOne({ user_id: user.user_id });
        res.json({
            status: 200,
            data: policy
        })
    } catch (err) {
        res.json({
            status: 500,
            err: err
        })
    }
}
//API to find policy info with the help of username ENDS Here//


//API to provide aggregated policy by each user START Here//
exports.aggregatedPolicy = async (req, res, next) => {
    try {
        let userData = await User.findOne({ firstname: req.params.username });
        let policyCarrer = await policy_carrier.findOne({ user_id: userData.user_id });
        let policyInfo = await Policy_Info.findOne({ user_id: userData.user_id });
        let policyCategory = await Policy_Category.findOne({ user_id: userData.user_id });
        res.status(200).json({
            success: true,
            policyCarrer: policyCarrer,
            policyInfo: policyInfo,
            policyCategory: policyCategory
        });
    } catch (err) {
        next(err);
    }
}
//API to provide aggregated policy by each user END Here//
