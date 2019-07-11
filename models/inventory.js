const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
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
const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
