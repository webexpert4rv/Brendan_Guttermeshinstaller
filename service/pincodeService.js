var pincodeDao=require('../dao/pincodeDao')
var userDao=require('../dao/userDao')


module.exports.postPinCode = (receivedData, callback) => {
    var sendData={email:receivedData.key}
    userDao.getuserByEmail(sendData,function(err,data1){
        if(err){
            callback(err)
        }else{
            receivedData['installerId']=data1._id
            pincodeDao.isCodeAndUser(receivedData,function(err,data){
                if(err){
                    callback(err)
                }else if(data){
                    callback(null,{error:true,data:null,message:"Postal code Exists already exists"})

                }else{
                    pincodeDao.postPinCode(receivedData,function(err,data1){
                        if(err){
                            callback(err)
                        }else{
                            callback(null,{error:false,data:null,message:"submitted successfully"})
                        }
                    })
                }
            })
        }
    })
};

module.exports.getPinCode = (receivedData, callback) => {
    var sendData={email:receivedData.key}
    userDao.getuserByEmail(sendData,function(err,data1){
        if(err){
            callback(err)
        }else{
            receivedData['installerId']=data1._id
            
            pincodeDao.getPinCode(receivedData,function(err,data){
                if(err){
                    callback(err)
                }else{
                    callback(null,{error:false,data:data,message:null})
                }
            })
        }
    })
};


module.exports.deletePinCode = (identifier, callback) => {
    pincodeDao.deletePinCode(identifier,function(err,data1){
        if(err){
            callback(err)
        }else{
            callback(null,{error:false,data:data1,message:null})
        }
    })
};

module.exports.getInstallerByPinCode = (receivedData, callback) => {
    pincodeDao.getInstallerByPinCode(receivedData,function(err,data1){
        if(err){
            callback(err)
        }else{
            callback(null,{error:false,data:data1,message:null})
        }
    })
};