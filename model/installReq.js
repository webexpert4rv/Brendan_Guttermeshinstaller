var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registerSchema = new Schema({
    quoteId: {
        type: Schema.Types.ObjectId, ref: 'quote'
    },
    installerId:{
        type: Schema.Types.ObjectId, ref: 'installer'
    },
    email: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: "0" // 0 -req ,1-pending,2-complted,3-reject,4-gitterInstaller
    },
    isGittermeshInstaller:{
        type: Boolean,
        default: false
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

var registerDetails = mongoose.model('installReq', registerSchema, 'installReq');
module.exports = registerDetails;