const mongoose = require('mongoose')

const gameScoreSchema = new mongoose.Schema({
    details: [{
        score: {
            type: String
        },
        resultstring: {
            type: String
        }
    }],
    totalscore: Number,
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
