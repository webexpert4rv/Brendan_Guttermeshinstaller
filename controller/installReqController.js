var installReqService=require('../service/installReqService')


module.exports.getInstallReq=(req,res)=>{
    var receivedData=req.body
    installReqService.getInstallReq(receivedData,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

module.exports.pendingInstallReq=(req,res)=>{
    var receivedData=req.body
    installReqService.pendingInstallReq(receivedData,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

module.exports.completedInstallReq=(req,res)=>{
    var receivedData=req.body
    installReqService.completedInstallReq(receivedData,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

module.exports.rejectedInstallReq=(req,res)=>{
    var receivedData=req.body
    installReqService.rejectedInstallReq(receivedData,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

module.exports.getInstallReqCounts=(req,res)=>{
    var receivedData=req.body
    installReqService.getInstallReqCounts(receivedData,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

module.exports.getBalance=(req,res)=>{
    var receivedData=req.body
    installReqService.getBalance(receivedData,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

module.exports.getInstaller=(req,res)=>{
    var key=req.body.key
    installReqService.getInstaller(key,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}


module.exports.updateInstallReq=(req,res)=>{
    var identifier = req.params.id;
    var receivedData=req.body
    installReqService.updateInstallReq(identifier,receivedData,function(err,data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}