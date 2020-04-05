const TrainsModel = require('./../db/models/Trains');

class TrainService {
  constructor() {
    this.trainDbAccesser = new TrainsModel();
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
          let response = await this.trainDbAccesser.addTrain(train)
        }
        return { error, train };
      }
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