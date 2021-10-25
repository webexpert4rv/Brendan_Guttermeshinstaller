var postCode=require('../model/postCode')
var installer=require('../model/installer')

module.exports.postPinCode=(receivedData,callback)=>{
    let data=new postCode(receivedData)
    data.save(function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.isCodeAndUser=(receivedData,callback)=>{
    postCode.findOne({$and:[{installerId:receivedData.installerId},{postCode:receivedData.postCode}]},function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.getPinCode=(receivedData,callback)=>{
    console.log(receivedData)
    postCode.find({installerId:receivedData.installerId},function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}


module.exports.deletePinCode=(identtifier,callback)=>{
    postCode.findByIdAndRemove({_id:identtifier},function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}

module.exports.getInstallerByPinCode=(receivedData,callback)=>{
    postCode.find({postCode:receivedData.postCode}).populate({path:'installerId',model:installer}).exec(function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}