var pincodeService=require('../service/pincodeService')

module.exports.postPinCode = (req, res) => {
    var receivedData = req.body;
    pincodeService.postPinCode(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports.getPinCode = (req, res) => {
    var receivedData = req.body;
    pincodeService.getPinCode(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports.deletePinCode = (req, res) => {
    var identifier = req.params.id
    pincodeService.deletePinCode(identifier, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};




module.exports.getInstallerByPinCode = (req, res) => {
    var receivedData = req.body;
    pincodeService.getInstallerByPinCode(receivedData, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};