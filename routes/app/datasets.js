var express = require('express');
var router = express.Router();

var netHelpers = require('../../lib/net-helpers');


router.get('/', function (req, res) {

    netHelpers.geqeRequest('/api/datasets', 'GET',null,function (resultObject) {
        if (resultObject.error) {
            console.error(resultObject.error);
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send(resultObject);
    })
});



module.exports = router;
