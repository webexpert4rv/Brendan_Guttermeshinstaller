var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accessories = new Schema({
    name: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    postalCode: {
        type: String,
        trim: true
    },
    suburb: {
        type: String,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    type:{
        type: String,
        trim: true
    },
    area:{
        type: String,
        trim: true
    },
    gutterSize:{
        type: String,
        trim: true
    },
    valleySize:{
        type: String,
        trim: true
    },
    Price:{
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    requirementType: {
        type: String,
        trim: true  // 1-kit ,2-kit+intsall,3-parts only
    },
    roofType: {
        type: String,
        trim: true  // 1-customorb ,2-tile,3-trimdesk,4-kilplok
    },
    typeOfGutterMesh: {
        type: String,
        trim: true  // 1-alumesh ,2-embermesh,3-plasmesh
    },
    GutterMeshProductionType: {
        type: String,
        trim: true  // 1-gutter ,2-value,3-gutter+value
    },
    gutterValue:{
        type:Number
    },
    valueValue:{
        type:Number
    },
    trimColor:{
        type:String
    },
    meshColor:{
        type:String
    },
    notes:{
        type:String
    },
    accessories:[{
        product:{type:String},
        color:{type:String},
        quantity:{type:String}
    }],
    kitPrice:{
        type:Number
    },
    accessoriesPrice:{
        type:Number
    },
    installationPrice:{
        type:Number
    },
    total:{
        type:Number
    },  
    subTotal:{
        type:Number
    },
    deliveryCharge:{
        type:Number
    },
    gst:{
        type:Number
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});



var accessoriesDetails = mongoose.model('quote', accessories, 'quote');
module.exports = accessoriesDetails;