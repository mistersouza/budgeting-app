const mongoose = require('mongoose');


const envelopeSchema = mongoose.Schema({
    name: {
        type: String
    },
    budget: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}); 


var Envelope = mongoose.model('Envelope', envelopeSchema); 

module.exports = Envelope;