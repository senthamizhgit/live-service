const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    train_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    current: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    delay: {
        type: String,
        required: true
    }
},{strict: true})