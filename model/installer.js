var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default:"1"  
    },
    activated: {
        type: Boolean,
        default: false
    },
    wallet: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
    
});

var registerDetails = mongoose.model('installer', registerSchema, 'installer');
module.exports = registerDetails;