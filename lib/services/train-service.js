const TrainsModel = require('./../db/models/Trains');
const FeedsModel = require('./../db/models/Feeds');

class TrainService {
  constructor() {
    this.trainDbAccesser = new TrainsModel();
    this.feedDbAccesser = new FeedsModel();
  }

  _constructFeedData(data={}) {
    let payload = {};
    payload.train_id = data.id;
    payload.name = data.name;
    payload.from = data.from || '';
    payload.to = data.to || '';
    payload.current = data.current || '';
    payload.status = data.status || 'Stopped';
    payload.delay = data.delay || 'On-Time';
    return payload;
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
          await this.trainDbAccesser.addTrain(train);
        }
        let feedData = this._constructFeedData(train);
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
      data = this._constructFeedData(payload);
      let id = payload.id;
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