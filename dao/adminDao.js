var adminModel=require('../model/admin')
var userModel=require('../model/user')
var installReq=require('../model/installReq')
var qoutelist=require('../model/quote')

module.exports.getAllAdmin=(callback)=>{
    adminModel.find({},function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.isEmailPresent=(receivedData,callback)=>{
    adminModel.findOne({email:receivedData.email},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}

module.exports.adminRegister=(receivedData,callback)=>{
    let data=new adminModel(receivedData)
    data.save(function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.updateAdminTable = (requestData, callback) => {
    adminModel.findOneAndUpdate({ email: requestData.email },
        {
            $set: requestData
        }, { upsert: true, new: true, context: 'query' }, function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
};

module.exports.getAllUserRequests=(callback)=>{
    userModel.find({$and:[{status:"1"},{isVerified:true}]},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}

module.exports.acceptedUserRequest=(callback)=>{
    userModel.find({$and:[{status:2},{isVerified:true}]},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}

module.exports.acceptUserRequest = (requestData, callback) => {
    userModel.findOneAndUpdate({ email: requestData.email },
        {
            $set: requestData
        }, { upsert: true, new: true, context: 'query' }, function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
};

module.exports.getPendingInstallationQoute=(callback)=>{
    installReq.find({isGittermeshInstaller:true},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}

module.exports.updateInstallationReq=(id,receivedData,callback)=>{
    installReq.findByIdAndUpdate({_id:id},{$set:receivedData},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}


module.exports.getInstaller=(id,callback)=>{
    userModel.findById({_id:id},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}
module.exports.updateInstaller=(receivedData,callback)=>{
    console.log(receivedData)
    userModel.findByIdAndUpdate({_id:receivedData.id},{$set:receivedData},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}
module.exports.updateQuote=(receivedData,callback)=>{
    console.log(receivedData)
    qoutelist.findByIdAndUpdate({_id:receivedData._id},{$set:receivedData},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}


module.exports.getQuote=(id,callback)=>{
    qoutelist.findById({_id:id},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}

module.exports.getAllQuote=(callback)=>{
    qoutelist.find(function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}
