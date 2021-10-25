var sessionService = require('../service/sessionService')
var bcrypt = require('bcryptjs')
var userDao = require('../dao/userDao')
var adminService = require('../service/adminService')


module.exports.signUp = (req, res) => {
    console.log(req)
    console.log(req.body)
    var receivedData = JSON.parse(req.body.data);
    var receivedFiles = req.files
    if ((receivedData.name == undefined) || (receivedData.name == "")) {
        res.send({
            error: true,
            data: null,
            message: "Please provide Name"
        });
        return;
    }
    if ((receivedData.email == undefined) || (receivedData.email == "")) {
        res.send({
            error: true,
            data: null,
            message: "Please provide Email"
        });
        return;
    }
    if ((receivedData.password == undefined) || (receivedData.password == "")) {
        res.send({
            error: true,
            data: null,
            message: "Please provide Password"
        });
        return;
    }
    if (receivedFiles.length > 0) {
        receivedData['insuredCard'] = receivedFiles[0].filename
        receivedData['whiteFrontCard'] = receivedFiles[1].filename
        receivedData['whiteBackCard'] = receivedFiles[2].filename
    }
    sessionService.signUp(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};
module.exports.adminSignup = (req, res) => {
    var receivedData = req.body;
    // console.log(req)
    // console.log(req.body)
    // var receivedData = JSON.parse(req.body.data);
    // var receivedFiles = req.files
    // if ((receivedData.name == undefined) || (receivedData.name == "")) {
    //     res.send({
    //         error: true,
    //         data: null,
    //         message: "Please provide Name"
    //     });
    //     return;
    // }
    // if ((receivedData.email == undefined) || (receivedData.email == "")) {
    //     res.send({
    //         error: true,
    //         data: null,
    //         message: "Please provide Email"
    //     });
    //     return;
    // }
    // if ((receivedData.password == undefined) || (receivedData.password == "")) {
    //     res.send({
    //         error: true,
    //         data: null,
    //         message: "Please provide Password"
    //     });
    //     return;
    // }
    // if (receivedFiles.length > 0) {
    //     receivedData['insuredCard'] = receivedFiles[0].filename
    //     receivedData['whiteFrontCard'] = receivedFiles[1].filename
    //     receivedData['whiteBackCard'] = receivedFiles[2].filename
    // }
    sessionService.adminSignup(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};




module.exports.login = (req, res) => {
    if (((req.body.email == undefined) || (req.body.email == "")) && ((req.body.userName == "") || (req.body.userName == undefined))) {
        res.send({
            error: true,
            message: "Please provide email or username"
        });
        return;
    }
    if ((req.body.password == undefined) || (req.body.password == "")) {
        res.send({
            error: true,
            message: "Please provide Password"
        });
        return;
    }
    var receivedData = req.body;
    sessionService.login(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        }
        else if (data) {
            console.log(data)
            console.log(req.body.password)
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                if (err) {
                    res.status(500).send(err)
                } else if (result) {
                    if (data.isVerified) {
                        data['role'] = '1'
                        if (data.activated) {
                            sessionService.createToken(data, function (err, tokendata) {
                                if (err) {
                                    res.status(500).send(err)
                                } else {
                                    res.status(200).send({ error: false, data: tokendata, message: null });
                                }
                            })
                        } else {
                            res.status(200).send({ error: true, data: null, message: 'Your verification is pending' })
                        }

                    } else {
                        res.status(200).send({ error: true, data: null, errorCode: "1", message: 'Please Verify your Account' });
                    }
                } else if (!result) {
                    res.status(200).send({ error: true, data: null, message: 'Login Failed Invalid Password' });
                } else {
                    res.status(200).send({ error: true, data: null, message: 'Something Went Wrong in Login' });
                }
            });
        } else {
            adminService.isEmailPresent(receivedData, function (err, data) {
                if (err) {
                    res.status(500).send(err)
                } else if (data) {
                    bcrypt.compare(req.body.password, data.password, function (err, result) {
                        if (err) {
                            res.status(500).send(err)
                        } else if (result) {
                            if (data.isVerified) {
                                data['role'] = '0'
                                if (data.activated) {
                                    sessionService.createToken(data, function (err, tokendata) {
                                        if (err) {
                                            res.status(500).send(err)
                                        } else {
                                            res.status(200).send({ error: false, data: tokendata, message: null });
                                        }
                                    })
                                } else {
                                    res.status(200).send({ error: true, data: null, message: 'Your verification is pending' })
                                }
                            } else {
                                res.status(200).send({ error: true, data: null, errorCode: "1", message: 'Please Verify your Account' });
                            }
                        } else if (!result) {
                            res.status(200).send({ error: true, data: null, message: 'Login Failed Invalid Password' });
                        } else {
                            res.status(200).send({ error: true, data: null, message: 'Something Went Wrong in Login' });
                        }
                    });
                } else {
                    res.status(200).send({ error: true, data: null, message: 'Email  not found' });
                }
            })
        }
    });
};

module.exports.otpVerify = (req, res) => {

    var receivedData = req.body;

    if ((receivedData.otp == undefined) || (receivedData.otp == "")) {
        res.send({
            error: true,
            message: "Please provide otp"
        });
        return;
    }
    if ((receivedData.email == undefined) || (receivedData.email == "")) {
        res.send({
            error: true,
            message: "Please provide email"
        });
        return;
    }
    if ((receivedData.type == undefined) || (receivedData.type == "")) {
        res.send({
            error: true,
            message: "Please provide Type"
        });
        return;
    }
    if (receivedData.type == "1") {
        sessionService.OtpVerify(receivedData, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                if ((receivedData.email == data.email) && (receivedData.otp == data.regOtpCode)) {
                    sessionService.activateClient(receivedData, function (err, data1) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            sessionService.mailSend(data, function (err, data2) {
                                if (err) {
                                    res.status(500).send(err);
                                } else {
                                    res.status(200).send(data);
                                }
                            })
                        }
                    })
                } else {
                    res.status(200).send({ error: true, data: null, message: "Please Provide Valid OTP" });
                }

            }
        });
    }
    else if (receivedData.type == "2") {
        sessionService.OtpVerify(receivedData, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                if ((receivedData.email == data.email) && (receivedData.otp == data.forgotOtpCode)) {
                    res.status(200).send({ error: false, data: null, message: null });
                } else {
                    res.status(200).send({ error: true, data: null, message: "Please Provide Valid OTP" });
                }

            }
        });
    }
};

module.exports.resendClientOtp = (req, res) => {
    var receivedData = req.body;
    if ((receivedData.email == undefined) || (receivedData.email == "")) {
        res.send({
            error: true,
            message: "Please provide Email"
        });
        return;
    }
    if ((receivedData.type == undefined) || (receivedData.type == "")) {
        res.send({
            error: true,
            message: "Please provide Type"
        });
        return;
    }
    userDao.isEmailIdPresent(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        }
        else if (data) {
            if (receivedData.type == "1") {
                sessionService.resendClientOtp(receivedData, function (err, data) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(data);
                    }
                });
            } else if (receivedData.type == "2") {
                sessionService.forgotResendClientOtp(receivedData, function (err, data) {
                    if (err) {
                        res.status(500).send(err);
                    } else if (data.errors) {
                        res.status(400).send(data.errors);
                    }
                    else {
                        res.status(200).send(data);
                    }
                });
            }
        } else {
            res.status(200).send({ error: true, data: null, message: "Email not found" });
        }
    })


};

module.exports.updateBalance = (req, res) => {
    var identifier = req.body.key;
    var receivedData = req.body;

    sessionService.updateBalance(identifier, receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
}

module.exports.updatePassword = (req, res) => {
    if ((req.body.email == undefined) || (req.body.email == "")) {
        res.send({
            error: true,
            message: "Please provide email"
        });
        return;
    }
    if ((req.body.newPassword == undefined) || (req.body.newPassword == "")) {
        res.send({
            error: true,
            message: "Please provide newPassword"
        });
        return;
    }
    else {
        var receivedData = req.body
        sessionService.updatePassword(receivedData, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data)
            }
        })
    }
}
module.exports.forgotPassword = (req, res) => {
    if ((req.body.email == undefined) || (req.body.email == "")) {
        res.send({
            error: true,
            message: "Please provide Email"
        });
        return;
    }

    var receivedData = req.body
    sessionService.forgotPassword(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });

}
module.exports.resetPassword = (req, res) => {
    if ((req.body.password == undefined) || (req.body.email == "")) {
        res.send({
            error: true,
            message: "Please provide password"
        });
        return;
    }
    if ((req.body.email == undefined) || (req.body.email == "")) {
        res.send({
            error: true,
            message: "Please provide Email"
        });
        return;
    }
    var receivedData = req.body
    sessionService.resetPassword(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });

}