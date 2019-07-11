const mongoose = require('mongoose')

const gameScoreSchema = new mongoose.Schema({
    score: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    iteration: {
        type: String
    }
});
const GameScore = mongoose.model('GameScore', gameScoreSchema);
module.exports = GameScore;
