var adminService=require('../service/adminService')

module.exports.getAllAdmin = (req, res) => {
    adminService.getAllAdmin( function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
    
}

module.exports.adminRegister = (req, res) => {
    var receivedData = req.body;
    console.log(receivedData)
    adminService.adminRegister(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports.adminResetPassword = (req, res) => {    
    var receivedData = req.body
    adminService.adminResetPassword(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.getAllUserRequests = (req, res) => {
    adminService.getAllUserRequests( function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.acceptUserRequest = (req, res) => {    
    var receivedData = req.body
    adminService.acceptUserRequest(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.rejectUserRequest = (req, res) => {    
    var receivedData = req.body
    adminService.rejectUserRequest(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.acceptedUserRequest = (req, res) => {    
    adminService.acceptedUserRequest( function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.getPendingInstallationQoute = (req, res) => {    
    adminService.getPendingInstallationQoute( function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.updateInstallationReq = (req, res) => {    
    var receivedData = req.body
    var identifier=req.params.id
    adminService.updateInstallationReq(identifier,receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.getQuote = (req, res) => {    
    var identifier=req.params.id
    adminService.getQuote(identifier, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.getAllQuote = (req, res) => {    
    adminService.getAllQuote(function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}
module.exports.updateInstaller = (req, res) => {  
    var receivedData = req.body  
    adminService.updateInstaller(receivedData,function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports.updateQuote = (req, res) => {  
    var receivedData = req.body  
    adminService.updateQuote(receivedData,function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}


module.exports.uploadfile = (req, res) => {
    var receivedData = {}

        var type = req.body.type
        var receivedFiles = req.files;
        console.log(receivedFiles)
        if (type == "1") {
            receivedData['insuredCard'] = receivedFiles[0].filename
        } else if (type == "2") {
            receivedData['whiteFrontCard'] = receivedFiles[0].filename
        } else {
            receivedData['whiteBackCard'] = receivedFiles[0].filename
        }
    
        receivedData['id'] = req.body.id
        adminService.updateInstaller(receivedData,function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    };

module.exports.getInstaller = (req, res) => {    
    var identifier=req.params.id
    adminService.getInstaller(identifier, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
}