const mongoose = require('mongoose');
const trainsSchema = require('./../schemas/trains-schema');

class TrainsModel {
    constructor() {
        this.Trains = mongoose.model('Trains', trainsSchema);
    }

    async addTrain(data) {
        try {
            let train = new this.Trains(data);
            return await train.save();
            
        } catch(err) {
            throw err;
        }   
    }

    async getTrainByName(name) {
        try {
            return await this.Trains.findOne({name})
        } catch(err) {
            throw err;
        }
    }

}

module.exports = TrainsModel;