const express = require('express');
const router = express.Router();
const TrainService = require('./../services/train-service');

const trainService = new TrainService();

router.get("/", (req, res) => {
    res.send({response: "Server is up and running"}).status(200);
})

router.get('/v1/live-feeds/', async (req, res) => {
    try {
        const {error, trains} = await trainService.getAllFeed();
        if(!error) {
            res.status(200).send(trains);
        } else {
            res.status(401).send(error);
        }
    } catch(err) {
        res.status(500).send(err);
    }
    
});

module.exports = router;