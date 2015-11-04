var express = require('express');
var router = express.Router();

var netHelpers = require('../../lib/net-helpers');

router.get('/:vp', function (req, res) {

    var jobId = req.params.vp;
    var username = req.query.username;
    var query = {"filter[where][username]": username};

    netHelpers.geqeRequest('/api/jobs/'+jobId, 'GET',query,function (resultObject) {
        if (resultObject.error) {
            console.error(resultObject.error);
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send(resultObject);
    })
});

router.delete('/:vp', function (req, res) {

    var jobId = req.params.vp;
    var username = req.query.username;
    var query = {"filter[where][username]": username};

    netHelpers.geqeRequest('/api/jobs/'+jobId, 'DELETE',query,function (resultObject) {
        if (resultObject.error) {
            console.error(resultObject.error);
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send(resultObject);
    })
});

router.get('/', function (req, res) {
    var username = req.query.username;
    var query = {"filter[where][username]": username};

    netHelpers.geqeRequest('/api/jobs', 'GET',query,function (resultObject) {
        if (resultObject.error) {
            console.error(resultObject.error);
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send(resultObject);
    })
});



router.post('/', function (req, res) {

    var job = req.query;
    netHelpers.geqeRequest('/api/jobs' , 'PUT',job,function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send("OK");
    })

});

module.exports = router;
