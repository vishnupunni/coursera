const mongoose = require('mongoose');

const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leaders', leaderSchema);

module.exports = Leaders;