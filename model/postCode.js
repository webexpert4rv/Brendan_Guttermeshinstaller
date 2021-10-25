var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registerSchema = new Schema({
    installerId: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    postCode:{
        type: Number,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    isActivated: {
        type: Boolean,
        default: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
    
});

var registerDetails = mongoose.model('postCode', registerSchema, 'postCode');
module.exports = registerDetails;