var installReq=require('../model/installReq')
var quote = require('../model/quote')


module.exports.getInstallReq=(receivedData,callback)=>{
    installReq.find({$and:[{status:"0"},{installerId:receivedData.id}]}).populate({path:'quoteId',model:quote}).exec(function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.pendingInstallReq=(receivedData,callback)=>{
    installReq.find({$and:[{status:"1"},{installerId:receivedData.id}]}).populate({path:'quoteId',model:quote}).exec(function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.completedInstallReq=(receivedData,callback)=>{
    installReq.find({$and:[{status:"2"},{installerId:receivedData.id}]}).populate({path:'quoteId',model:quote}).exec(function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.rejectedInstallReq=(receivedData,callback)=>{
    installReq.find({$and:[{status:"3"},{installerId:receivedData.id}]}).populate({path:'quoteId',model:quote}).exec(function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.updateInstallReq=(identifier,receivedData,callback)=>{
    installReq.findOneAndUpdate({_id:identifier},{$set:receivedData},function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.getInstallReqCount=(receivedData,callback)=>{
    installReq.countDocuments({$and:[{status:"0"},{installerId:receivedData.id}]},function(err,count){
        if(err){
            callback(err)
        }else{
            callback(null,count)
        }
    })
}

module.exports.pendingInstallReqCount=(receivedData,callback)=>{
    installReq.countDocuments({$and:[{status:"1"},{installerId:receivedData.id}]},function(err,count){
        if(err){
            callback(err)
        }else{
            callback(null,count)
        }
    })
}

module.exports.completedInstallReqCount=(receivedData,callback)=>{
    installReq.countDocuments({$and:[{status:"2"},{installerId:receivedData.id}]},function(err,count){
        if(err){
            callback(err)
        }else{
            callback(null,count)
        }
    })
}

module.exports.rejectedInstallReqCount=(receivedData,callback)=>{
    installReq.countDocuments({$and:[{status:"3"},{installerId:receivedData.id}]},function(err,count){
        if(err){
            callback(err)
        }else{
            callback(null,count)
        }
    })
}