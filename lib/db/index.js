const mongoose = require('mongoose');
const configs = require('./../../configs/service-config');

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(configs.mongodb.connection, configs.mongodb.options).then((res, err) => {
            if(err){
                return reject(err)
            }
            resolve();
        })
    })
}

module.exports = {connect};

