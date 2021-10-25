var express = require('express');
var apiRoutes = express.Router();
var multer = require('multer')
var path = require('path')

var sessionController = require('../controller/sessionController')
var pincodeController=require('../controller/pincodeController')
var installReqController=require('../controller/installReqController')

var verifiedUser=require('../configuration/userVerification')
var adminController=require('../controller/adminController')

var fs = require('fs');
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'asserts/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

apiRoutes.get('/asserts/images/:id', function (req, res) {
    if (fs.existsSync(path.resolve('./asserts/images') + '/' + req.params.id)) {
        res.sendFile(path.resolve('./asserts/images') + '/' + req.params.id);
    } else {
        res.send('');
    }
})

var upload = multer({
    storage: storage
});
//session
apiRoutes.post('/signup',upload.any(),sessionController.signUp);//tested
apiRoutes.post('/adminsignup',sessionController.adminSignup)
apiRoutes.post('/login',sessionController.login);//tested
apiRoutes.post('/otpVerify', sessionController.otpVerify);//tested
apiRoutes.post('/resendOtp', sessionController.resendClientOtp);//tested
apiRoutes.post('/forgotPassword', sessionController.forgotPassword)//tested
apiRoutes.post('/resetPassword', sessionController.resetPassword)//tested
apiRoutes.post('/updateBalance',verifiedUser,sessionController.updateBalance)


//post pincode
apiRoutes.post('/postPinCode',verifiedUser, pincodeController.postPinCode)//tested
apiRoutes.delete('/pinCode/:id',verifiedUser, pincodeController.deletePinCode)//tested
apiRoutes.get('/getPinCode',verifiedUser, pincodeController.getPinCode)//tested
apiRoutes.post('/getInstallerByPinCode',verifiedUser, pincodeController.getInstallerByPinCode)//tested

//install Req
apiRoutes.get('/getInstallReq',verifiedUser, installReqController.getInstallReq)
apiRoutes.get('/pendingInstallReq',verifiedUser, installReqController.pendingInstallReq)
apiRoutes.get('/completedInstallReq',verifiedUser, installReqController.completedInstallReq)
apiRoutes.get('/rejectedInstallReq',verifiedUser, installReqController.rejectedInstallReq)
apiRoutes.put('/updateInstallReq/:id',verifiedUser, installReqController.updateInstallReq)
apiRoutes.get('/getInstallReqCounts',verifiedUser, installReqController.getInstallReqCounts)
apiRoutes.get('/getBalance',verifiedUser, installReqController.getBalance)
apiRoutes.get('/installer',verifiedUser,installReqController.getInstaller)


//admin
apiRoutes.post('/adminRegister', adminController.adminRegister)
apiRoutes.get('/getAllAdmin', adminController.getAllAdmin)
apiRoutes.post('/adminResetPassword', adminController.adminResetPassword)
apiRoutes.get('/getAllUserRequests', adminController.getAllUserRequests)
apiRoutes.post('/acceptUserRequest', adminController.acceptUserRequest)
apiRoutes.post('/rejectUserRequest', adminController.rejectUserRequest)
apiRoutes.get('/acceptedUserRequest', adminController.acceptedUserRequest)
apiRoutes.get('/getPendingInstallationQoute', adminController.getPendingInstallationQoute)
apiRoutes.put('/updateInstallationReq/:id', adminController.updateInstallationReq)
apiRoutes.get('/getInstaller/:id', adminController.getInstaller)
apiRoutes.get('/getQuote/:id', adminController.getQuote)
apiRoutes.get('/getQuote', adminController.getAllQuote)
apiRoutes.post('/updateQuote', adminController.updateQuote)
apiRoutes.post('/updateinstaller',adminController.updateInstaller)
apiRoutes.post('/uploadfile',upload.any(),adminController.uploadfile);//tested









module.exports = apiRoutes;
