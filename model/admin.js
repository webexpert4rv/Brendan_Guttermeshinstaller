var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var adminSchema = new Schema({
    userName: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    activated: {
        type: Boolean,
        default: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
    
});

var adminDetails = mongoose.model('admin', adminSchema, 'admin');
module.exports = adminDetails;