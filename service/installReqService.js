var installReqDao=require('../dao/installReqDao')
var userDao=require('../dao/userDao')

module.exports.getInstallReq=(receivedData,callback)=>{
    var sendData=({email:receivedData.key})
    userDao.getuserByEmail(sendData,function(err,data){
        if(err){
            callback(err)
        }else{
            receivedData['id']=data._id
            installReqDao.getInstallReq(receivedData,function(err,data){
                if(err){
                    callback(err)
                }else{
                    callback(null,{error:false,data:data,message:null})
                }
            })
        }
    })
}

module.exports.pendingInstallReq=(receivedData,callback)=>{
    var sendData={email:receivedData.key}
    userDao.getuserByEmail(sendData,function(err,data){
        if(err){
            callback(err)
        }else{
            receivedData['id']=data._id
            installReqDao.pendingInstallReq(receivedData,function(err,data){
                if(err){
                    callback(err)
                }else{
                    callback(null,{error:false,data:data,message:null})
                }
            })
        }
    })
}

module.exports.completedInstallReq=(receivedData,callback)=>{
    var sendData=({email:receivedData.key})
    userDao.getuserByEmail(sendData,function(err,data){
        if(err){
            callback(err)
        }else{
            receivedData['id']=data._id
            installReqDao.completedInstallReq(receivedData,function(err,data){
                if(err){
                    callback(err)
                }else{
                    callback(null,{error:false,data:data,message:null})
                }
            })
        }
    })
}

module.exports.rejectedInstallReq=(receivedData,callback)=>{
    var sendData=({email:receivedData.key})
    userDao.getuserByEmail(sendData,function(err,data){
        if(err){
            callback(err)
        }else{
            receivedData['id']=data._id
            installReqDao.rejectedInstallReq(receivedData,function(err,data){
                if(err){
                    callback(err)
                }else{
                    callback(null,{error:false,data:data,message:null})
                }
            })
        }
    })
}

module.exports.getInstallReqCounts=(receivedData,callback)=>{
    var sendData=({email:receivedData.key})
    userDao.getuserByEmail(sendData,function(err,data){
        if(err){
            callback(err)
        }else{
            receivedData['id']=data._id
            installReqDao.getInstallReqCount(receivedData,function(err,data1){
                if(err){
                    callback(err)
                }else{
                    installReqDao.pendingInstallReqCount(receivedData,function(err,data2){
                        if(err){
                            callback(err)
                        }else{
                            installReqDao.completedInstallReqCount(receivedData,function(err,data3){
                                if(err){
                                    callback(err)
                                }else{
                                    installReqDao.rejectedInstallReqCount(receivedData,function(err,data4){
                                        if(err){
                                            callback(err)
                                        }else{
                                            var response={
                                                installReqCount:data1,pendingInstallReqCount:data2,completedInstallReqCount:data3,rejectedInstallReqCount:data4
                                            }
                                            callback(null,{error:false,data:response,message:null})
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports.getBalance=(receivedData,callback)=>{
    userDao.getuserByEmail({email:receivedData.key},function(err,data){
        if(err){
            callback(err)
        }else{
            var res={balance:data.wallet}
            callback(null,{error:false,data:res,message:null})
        }
    })
}
module.exports.getInstaller=(key,callback)=>{
    userDao.getInstaller({email:key},function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,{error:false,data:data,message:null})
        }
    })
}



module.exports.updateInstallReq=(identifier,receivedData,callback)=>{
    installReqDao.updateInstallReq(identifier,receivedData,function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,{error:false,data:null,message:null})
        }
    })
}