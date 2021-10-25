var adminDao=require('../dao/adminDao')
var bcrypt = require('bcryptjs')
var saltRounds = 10
var emailConfig = require('../configuration/emailConfig')
const nodemailer = require('nodemailer');

module.exports.getAllAdmin = (receivedData, callback) => {
    adminDao.getAllAdmin(receivedData, function (err, data) {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}

module.exports.adminRegister = (receivedData, callback) => {
    adminDao.isEmailPresent(receivedData, function (err, resultData) {
        if (err) {
            callback(err);
        } else if (!(resultData)) {
            bcrypt.hash(receivedData.password, saltRounds, function (err, hash) {
                if (err) {
                    callback(err);
                } else {
                    receivedData['password']=hash
                    adminDao.adminRegister(receivedData, function (err, Results) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, { error: false, data: null, message: "Registered" })
                        }
                    });
                }
            })
        } else {
            callback(null, { error: true, data: null, message: "Email id already exists" })
        }
    })
};

module.exports.adminResetPassword = (receivedData, callback) => {
    bcrypt.hash(receivedData.password, saltRounds, function (err, hash) {
        if (err) {
            callback(err)
        } else {
            var data = { email: receivedData.email, password: hash }
            adminDao.updateAdminTable(data, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, { error: false, data: null, message: 'password Updated Successfully' });
                }
            });
        }
    })

};
module.exports.isEmailPresent = (receivedData, callback) => {
    adminDao.isEmailPresent(receivedData, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}

module.exports.getAllUserRequests = ( callback) => {
    adminDao.getAllUserRequests( function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}

module.exports.rejectUserRequest = (receivedData, callback) => {
    var sendData={email:receivedData.email,status:"3"}
    adminDao.acceptUserRequest(sendData, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}

module.exports.acceptUserRequest = (receivedData, callback) => {
    var sendData={email:receivedData.email,activated:true,status:"2"}
    adminDao.acceptUserRequest(sendData, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            const transporter = nodemailer.createTransport({
                service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                auth: {
                    user: emailConfig.SERVICE_EMAIL,
                    pass: emailConfig.SERVICE_EMAIL_PASSWORD
                }
            });
            const mailOptions = {
                to: receivedData.email,
                from: emailConfig.EMAIL_FROM,
                subject: 'Request accepted',
                text: `Hello ${resultData.name}, \n Thank you for Registering. The Gutter Mesh Team has reviewed your application and approved`
            };
            transporter.sendMail(mailOptions)
                .then(() => {
                    callback(null, { error: false, data: null, message: null });
                }).catch(err => {
                    callback(null, { error: true, data: null, message: "unexpected Error in sending mail" });
                })
            callback(null,resultData)
        }
    })
}

module.exports.acceptedUserRequest = ( callback) => {
    adminDao.acceptedUserRequest( function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}

module.exports.getPendingInstallationQoute = ( callback) => {
    adminDao.getPendingInstallationQoute( function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}

module.exports.updateInstallationReq = (identifier,receivedData, callback) => {
    var sendData={installerId:receivedData.installerId,isGittermeshInstaller:true}
    adminDao.updateInstallationReq(identifier,sendData, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}


module.exports.getQuote = (identifier, callback) => {
    adminDao.getQuote(identifier, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}

module.exports.getAllQuote = (callback) => {
    adminDao.getAllQuote(function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}


module.exports.updateInstaller = (receivedData, callback) => {
    adminDao.updateInstaller(receivedData, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            var responseData = {
                error:false,
                data:null,
                message:null
            }
            callback(null,responseData)
        }
    })
}

module.exports.updateQuote = (receivedData, callback) => {
    adminDao.updateQuote(receivedData, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            var responseData = {
                error:false,
                data:null,
                message:null
            }
            callback(null,responseData)
        }
    })
}


module.exports.getInstaller = (identifier, callback) => {
    adminDao.getInstaller(identifier, function (err, resultData) {
        if (err) {
            callback(err);
        } else{
            callback(null,resultData)
        }
    })
}