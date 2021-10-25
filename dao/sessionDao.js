var userModule=require('../model/user')

module.exports.resendClientOtp = (requestData, callback) => {
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