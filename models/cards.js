const mongoose = require('mongoose')

const cardsSchema = new mongoose.Schema({
    rank: {
        type: String
    },
    suite:{
        type:String
    },
    index:{
        type: Number
    }
});
const Cards = mongoose.model('Cards', cardsSchema);
module.exports = Cards;
