var installer=require('../model/installer')

module.exports.getInstallerByEmail=(receivedData,callback)=>{
    installer.findOne({email:receivedData.email},function(err,data){
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}