const mongoose = require('mongoose');
const feedsSchema = require('./../schemas/feeds-schema');

class FeedsModel {
    constructor() {
        this.Feeds = mongoose.model('Feeds', feedsSchema);
    }

    async addFeed(data) {
        try {
            let feed = new this.Feeds(data);
            return await feed.save();
            
        } catch(err) {
            throw err;
        }   
    }

    async updateFeed(id, data) {
        try {
            let response = await this.Feeds.updateMany({train_id: id}, data);
            return response;
        } catch(err) {
            throw err;
        }
    }

    async removeFeedByTrainId(id) {
        try {
            return await this.Feeds.deleteMany({train_id: id});
        } catch(err) {
            throw err;
        }
    }

    async getAllFeed() {
        try {
            return await this.Feeds.find({})
        } catch(err) {
            throw err;
        }
    }

}

module.exports = FeedsModel;