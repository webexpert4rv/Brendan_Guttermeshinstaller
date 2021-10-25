var userModule=require('../model/user')
var installer=require('../model/installer')


module.exports.isEmailAnduserNamePresent=(receivedData,callback)=>{
    userModule.findOne({email:receivedData.email},function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}

module.exports.isEmailIdPresent=(receivedData,callback)=>{
    userModule.findOne({email:receivedData.email},function(err,data){
        if(err){
            callback(err)
        }else{
            console.log(data)
            callback(null,data)
        }
    })
}

module.exports.updateUserTable = (requestData, callback) => {
    userModule.findOneAndUpdate({ email: requestData.email },
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

module.exports.signUp = (requestData, callback) => {
    let data=new userModule(requestData)
    data.save(function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,result);
                }
            });
};

module.exports.getuserByEmail = (requestData, callback) => {
    userModule.findOne({ email: requestData.email },function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
};

module.exports.getInstaller = (requestData, callback) => {
    userModule.findOne({ email: requestData.email },function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
};



module.exports.getuserByEmail = (requestData, callback) => {
    userModule.findOne({ email: requestData.email },function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
};


module.exports.updateBalance = (email,requestData, callback) => {
    userModule.findOneAndUpdate({ email: email },
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
