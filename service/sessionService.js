var userDao = require('../dao/userDao')
var bcrypt = require('bcryptjs')
var saltRounds = 10
var emailConfig = require('../configuration/emailConfig')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
var sessionDao = require('../dao/sessionDao')

module.exports.signUp = (receivedData, callback) => {
    userDao.isEmailAnduserNamePresent(receivedData, function (err, resultData) {
        if (err) {
            callback(err);
        } else if (!(resultData)) {
            bcrypt.hash(receivedData.password, saltRounds, function (err, hash) {
                if (err) {
                    callback(err);
                } else {
                    var otp = Math.floor(100000 + Math.random() * 900000);
                    otp = otp.toString().substring(0, 6);
                    otp = parseInt(otp);
                    console.log(otp)
                    var serviceData = {
                        email: receivedData.email,
                        password: hash,
                        name: receivedData.name,
                        businessName:receivedData.businessName,
                        abn:receivedData.abn,
                        lic:receivedData.lic,
                        facet:receivedData.facet,
                        downpipes:receivedData.downpipes,
                        gutters:receivedData.gutters,
                        certifiedFee:receivedData.certifiedFee,
                        certifiedMeter:receivedData.certifiedMeter,
                        insured:receivedData.insured,
                        whitecard:receivedData.whitecard,
                        certified:receivedData.certified,
                        phoneNumber: receivedData.phoneNumber,
                        address: receivedData.address,
                        insuredCard:receivedData.insuredCard,
                        whiteFrontCard:receivedData.whiteFrontCard,
                        whiteBackCard:receivedData.whiteBackCard,
                        regOtpCode: otp,
                        regOtpTime: Date.now(),
                    }
                    userDao.signUp(serviceData, function (err, Results) {
                        if (err) {
                            callback(err);
                        } else {
                            const transporter = nodemailer.createTransport({
                                host:'smtp.gmail.com',
                                port: 587,
                                secure: false,
                                auth: {
                                    user: emailConfig.SERVICE_EMAIL,
                                    pass: emailConfig.SERVICE_EMAIL_PASSWORD
                                }
                                /*
                                service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                                auth: {
                                    user: emailConfig.SERVICE_EMAIL,
                                    pass: emailConfig.SERVICE_EMAIL_PASSWORD
                                }*/
                            });
                            const mailOptions = {
                                to: Results.email,
                                from: emailConfig.EMAIL_FROM,
                                subject: emailConfig.WELCOME_SUBJECT ,
                                text: `Hello ${Results.name},Welcome to Gutter Mesh Trade.\n You're registered to our site, Please Activate your account, by entering the below OTP. \n Your OTP is ${otp}`
                            };
                            transporter.sendMail(mailOptions)
                                .then(() => {
                                    var resData = {
                                        error: false,
                                        data: null,
                                        message: null
                                    }
                                    callback(null, resData);
                                }).catch(err => {
                                    var resData = {
                                        error: true,
                                        data: null,
                                        message: "Error in Sending Email"
                                    }
                                    callback(null, resData);
                                })
                        }
                    });
                }
            })
        } else {
            callback(null, { error: true, data: null, message: "Email id or username already exists" })
        }
    })
};
module.exports.adminSignup = (receivedData, callback) => {
    userDao.isEmailAnduserNamePresent(receivedData, function (err, resultData) {
        if (err) {
            callback(err);
        } else if (!(resultData)) {
            bcrypt.hash(receivedData.password, saltRounds, function (err, hash) {
                if (err) {
                    callback(err);
                } else {
                    var serviceData = {
                        email: receivedData.email,
                        password: hash,
                        name: receivedData.name,
                        businessName:receivedData.businessName,
                        abn:receivedData.abn,
                        lic:receivedData.lic,
                        facet:receivedData.facet,
                        downpipes:receivedData.downpipes,
                        gutters:receivedData.gutters,
                        certifiedFee:receivedData.certifiedFee,
                        certifiedMeter:receivedData.certifiedMeter,
                        insured:receivedData.insured,
                        whitecard:receivedData.whitecard,
                        certified:receivedData.certified,
                        phoneNumber: receivedData.phoneNumber,
                        address: receivedData.address,
                        insuredCard:receivedData.insuredCard,
                        whiteFrontCard:receivedData.whiteFrontCard,
                        whiteBackCard:receivedData.whiteBackCard,
                        discount:receivedData.discount,
                        notes:receivedData.notes,
                        status:"2",
                        isVerified:true,
                        activated:true, 
                    }
                    userDao.signUp(serviceData, function (err, Results) {
                        if (err) {
                            callback(err);
                        } else {
                            var resData = {
                                error: false,
                                data: null,
                                message: null
                            }
                            callback(null, resData);
                        }
                    });
                }
            })
        } else {
            callback(null, { error: true, data: null, message: "Email id or username already exists" })
        }
    })
};


module.exports.login = (receivedData, callback) => {
    
    userDao.isEmailIdPresent(receivedData, function (err, data) {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}
module.exports.createToken = (data, callback) => {
    var token = jwt.sign({
        id: data.email
    }, process.env.SESSION_tokenSECRET, {
        expiresIn: 864000000
        //expiresIn: 900 // expires in 15 minutes
    });
    console.log(token)
    var refreshToken = jwt.sign({
        id: data.email
    }, process.env.SESSION_refreshTokenSECRET, {
        expiresIn: 864000000 // expires in 24 hours
    });
    var tokens = {
        token: token,
        refreshToken: refreshToken,
        role: data.role
    }
    if (token == undefined || refreshToken == undefined || token == "" || refreshToken == "") {
        callback(null, { error: true, data: null, message: "unexpected Error" });
    } else {
        callback(null, tokens);
    }
};

module.exports.OtpVerify = (receivedData, callback) => {
    userDao.isEmailAnduserNamePresent(receivedData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

module.exports.resendClientOtp = (receivedData, callback) => {
    var otp = Math.floor(100000 + Math.random() * 900000);
    otp = otp.toString().substring(0, 6);
    otp = parseInt(otp);
    console.log(otp)
    var serviceData = {
        email: receivedData.email,
        regOtpCode: otp,
        regOtpTime: Date.now()
    }
    sessionDao.resendClientOtp(serviceData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            const transporter = nodemailer.createTransport({
                service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                auth: {
                    user: emailConfig.SERVICE_EMAIL,
                    pass: emailConfig.SERVICE_EMAIL_PASSWORD
                }
            });
            const mailOptions = {
                to: result.email,
                from: emailConfig.EMAIL_FROM,
                subject: emailConfig.WELCOME_SUBJECT,
                text: `Hello ${result.name},Welcome to Webcrm  \n You're registered to our site,Please Activate your account, Your OTP is ${serviceData.regOtpCode}`
            };
            transporter.sendMail(mailOptions)
                .then(() => {
                    callback(null, { error: false, data: null, message: null });
                }).catch(err => {
                    callback(null, { error: true, data: null, message: "unexpected Error in sending mail" });
                })
        }
    });

};

module.exports.mailSend = (receivedData, callback) => {
    const transporter = nodemailer.createTransport({
        service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
        auth: {
            user: emailConfig.SERVICE_EMAIL,
            pass: emailConfig.SERVICE_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        to: receivedData.email+",sales.guttermeshdirect@gmail.com",
        from: emailConfig.EMAIL_FROM,
        subject: 'Request Register Successfully',
        text: `Dear, ${receivedData.name} \n Thank you for Registering. The Gutter Mesh Team will review your application and advise when approved.`
    };
    transporter.sendMail(mailOptions)
        .then(() => {
            callback(null, { error: false, data: null, message: null });
        }).catch(err => {
            callback(null, { error: true, data: null, message: "unexpected Error in sending mail" });
        })

}
module.exports.activateClient = (receivedData, callback) => {
    var serviceData = {
        email: receivedData.email,
        isVerified: true
    }
    userDao.updateUserTable(serviceData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, { error: false, data: null, "message": null });
        }
    });
};

module.exports.forgotResendClientOtp = (receivedData, callback) => {

    var otp = Math.floor(100000 + Math.random() * 900000);
    otp = otp.toString().substring(0, 6);
    otp = parseInt(otp);
    var serviceData = {
        email: receivedData.email,
        forgotOtpCode: otp,
        forgotOtpTime: Date.now()
    }
    sessionDao.resendClientOtp(serviceData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            const transporter = nodemailer.createTransport({
                service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                auth: {
                    user: emailConfig.SERVICE_EMAIL,
                    pass: emailConfig.SERVICE_EMAIL_PASSWORD
                }
            });
            const mailOptions = {
                to: result.email,
                from: emailConfig.EMAIL_FROM,
                subject: emailConfig.WELCOME_SUBJECT,
                text: `Hello,\n\n Welcome to Webcrm  ${result.name}.\n You're registered to our site,Please Activate your account, Your OTP is ${serviceData.forgotOtpCode}`
            };
            transporter.sendMail(mailOptions)
                .then(() => {
                    callback(null, { error: false, data: null, message: null });
                }).catch(err => {
                    callback(null, { error: true, data: null, message: "unexpected Error in sending mail" });
                })
        }
    });

};

module.exports.forgotPassword = (receivedData, callback) => {
    userDao.isEmailIdPresent(receivedData, function (err, data) {
        if (err) {
            callback(err);
        } else if (data) {
            var otp = Math.floor(100000 + Math.random() * 900000);
            otp = otp.toString().substring(0, 6);
            otp = parseInt(otp);
            var serviceData = {
                email: receivedData.email,
                forgotOtpCode: otp,
                forgotOtpTime: Date.now()
            }
            userDao.updateUserTable(serviceData, function (err, Results) {
                if (err) {
                    callback(err);
                } else {
                    const transporter = nodemailer.createTransport({
                        service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                        auth: {
                            user: emailConfig.SERVICE_EMAIL,
                            pass: emailConfig.SERVICE_EMAIL_PASSWORD
                        }
                    });
                    const mailOptions = {
                        to: Results.email,
                        from: emailConfig.EMAIL_FROM,
                        subject: emailConfig.WELCOME_SUBJECT,
                        text: `Hello ${Results.name}, Welcome to Webcrm . You can reset your password using this OTP ${Results.forgotOtpCode}`
                    };
                    transporter.sendMail(mailOptions)
                        .then(() => {
                            callback(null, { error: false, data: null, message: null })
                        }).catch(err => {
                            callback(null, { error: true, data: null, message: "Error in Sending mail" })
                        })
                }
            })
        } else {
            callback(null, { error: true, data: null, message: "Email id doesn’t exist" })
        }
    })
}

module.exports.resetPassword = (receivedData, callback) => {
    bcrypt.hash(receivedData.password, saltRounds, function (err, hash) {
        if (err) {
            callback(err)
        } else {
            var data = { email: receivedData.email, password: hash }
            userDao.updateUserTable(data, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, { error: false, data: null, message: 'password Updated Successfully' });
                }
            });
        }
    })

};

module.exports.updateBalance = (identifier, receivedData, callback) => {
    var sendData = {email:identifier}
    userDao.getuserByEmail(sendData,function(err,result){
        if (err) {
            callback(err);
        } else {
            console.log(result)
            var sendData1 = {wallet:Number(result['wallet'])+Number(receivedData['amount'])}
            console.log(sendData1)
            userDao.updateBalance(identifier, sendData1, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, { error: false, data: null, message:null });
                }
            });
        }
    })
    
    
}


