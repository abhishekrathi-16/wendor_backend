const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please provide item name'],
    },
    price: {
        type: Number,
        required: [true,'Please provide item price'],
    },
    
    available_units: {
        type: Number,
        required: [true,'Please provide number of available units'],
    },
    display_image_url: {
        type: String,
        default: 'http://example.com/images/default.jpg'
    }
})

module.exports = mongoose.model('Inventory',inventorySchema);