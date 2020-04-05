const TrainsModel = require('./../db/models/Trains');
const FeedsModel = require('./../db/models/Feeds');

class TrainService {
  constructor() {
    this.trainDbAccesser = new TrainsModel();
    this.feedDbAccesser = new FeedsModel();
  }

  async addTrain(id, name, city ) {
    try {
      let error = null;
      let train = null;
      if(!name || !city) {
        error = "Missing Name or City!"
        return {error, train}
      } else {
        name = name.trim().toLowerCase();
        city = city.trim().toLowerCase();
        train = { id, name, city };
        let exist = await this.trainDbAccesser.getTrainByName(name);
        if(!exist) {
          await this.trainDbAccesser.addTrain(train)
        }
        let feedData = {};
        feedData.train_id = id;
        feedData.name = name;
        feedData.from = '';
        feedData.to = '';
        feedData.current = '';
        feedData.status = 'Stopped';
        feedData.delay = 'On-Time';
        await this.feedDbAccesser.addFeed(feedData);
        let trains = await this.feedDbAccesser.getAllFeed();
        return { error, train, trains };
      }
    } catch(err) {
      console.log(err)
    }
  }

  async getAllFeed() {
    try {
      let error = null;
      let trains = await this.feedDbAccesser.getAllFeed();
      return {error, trains}
    } catch(err) {
      console.log(err)
    }
  }

  async updateFeedByTrainId(payload) {
    try {
      let data={}, error = null;
      let id = payload.id;
      data.from = payload.from;
      data.current = payload.current;
      data.to = payload.to;
      data.status = payload.status;
      data.delay = payload.delay;
      let train = await this.feedDbAccesser.updateFeed(id, data);
      return {error, train}

    } catch(err) {
      console.log(err)
    }
  }

  async removeFeedByTrainId(id) {
    try {
      let error, train;
      train = await this.feedDbAccesser.removeFeedByTrainId(id);
      return {error, train}
    } catch(err) {
      console.log(err)
    }
  }

  async getTrainByName(name) {
    try {
      let error = null;
      let train = null;
      if(!name) {
        error = "Missing Name";
        return {error, train}
      }
      name = name.trim().toLowerCase();
      train = await this.trainDbAccesser.getTrainByName(name);
      return {error, train}
    } catch(err) {
      console.log(err)
    }
  }

}

module.exports = TrainService;