var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    businessName: {
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
    abn: {
        type: String,
        trim: true
    },
    lic: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    wallet: {
        type: Number,
        default: 0
    },
    regOtpCode:{
        type: String,
    },
    regOtpTime:{
        type: String,
    },
    forgotOtpCode:{
       type: String,
    },
    forgotOtpTime:{
        type: String,
    },
    insured:{
        type: Boolean,
    },
    whitecard:{
        type: Boolean,
    },
    certified:{
        type: Boolean,
    },
    certifiedFee:{
        type:String,
    },
    certifiedMeter:{
        type:String,
    },
    whiteBackCard:{
        type: String,//type 1
    },
    whiteFrontCard:{
        type: String,//type 2
    },
    insuredCard:{
        type: String,//type 3
    },
    discount:{
        type:Number,
        default:0
    },
    notes:{
        type:String,
        trim:true
    },
    facet:{
        type: Boolean,
        default:false,
    },
    gutters:{
        type: Boolean,
        default:false,

    },
    downpipes:{
        type: Boolean,
        default:false,

    },
    role: {
        type: String,
        default:"1"  ////role-0=>admin,role-1=>client,role-2 ib
    },
    activated: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default:"1"  ////role-1=>req,role-2=>accepted,role-3 rejected
    },
    createAt: {
        type: Date,
        default: Date.now
    }
    
});

var registerDetails = mongoose.model('user', registerSchema, 'user');
module.exports = registerDetails;