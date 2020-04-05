const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const configs = require('../configs/service-config');

const TrainService = require('./services/train-service');

const router = require('./router/router');

class Server {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketio(this.server);
        this.trainService = new TrainService();
    }

    appConfig() {
        this.app.use(cors());
        this.app.use(router);
    }

    connectDB() {
        mongoose.connect(configs.mongodb.connection, configs.mongodb.options, (err)=> {
            if(err) {
                console.log(err)
            } else {
                console.log('DB Connected')
            }
        });
        mongoose.set('useCreateIndex', true);
    }

    processWebSocket() {
        this.io.on('connection', (socket) => {
    

            socket.on('join', async (data, callback) => {
                
                const {error, train} = await this.trainService.addTrain(socket.id, data.name, data.city);
                if(error) {
                    return callback(error)
                }
                socket.emit('message', {train: 'admin', text: train});
                socket.broadcast.to('chennai').emit('message', {train: 'admin', text: train})
                socket.join(train.city)
                callback();
            })
        
            socket.on('sendMessage', async (message, callback) => {
                const {error, train} = await this.trainService.getTrainByName(message.name);
                if(error) {
                    return callback(error)
                }
                let response = {};
                response.id = train.id
                response.name = train.name
                response.from = message.from
                response.to = message.to
                response.current = message.current
                response.status = message.status
                response.delay = message.delay
                this.io.to('chennai').emit('message', { train: 'admin', text: response });
            
                callback();
            });
        
            socket.on('disconnect', () => {
                // const train = removeTrain(socket.id);
        
                // if(train) {
                //   io.to(train.city).emit('message', { user: 'Admin', text: `${train.name} has left.` });
                //   io.to(train.city).emit('cityData', { city: train.city, trains: getTrainsInRoom(train.city)});
                // }
            })
        })
    }

    startServer() {
        this.appConfig();
        this.server.listen(configs.port, () => {
            console.log('Server has started on Port : ', configs.port)
        })
        this.connectDB();
        this.processWebSocket();
    }
}

module.exports = Server;
