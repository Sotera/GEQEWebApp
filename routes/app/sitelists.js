var express = require('express');
var router = express.Router();

var netHelpers = just_include('netHelpers');

router.delete('/delete/:vp', function(req,res){
    var sitelist = req.params.vp;
    netHelpers.performLoopbackAjaxRequest('/api/sitelists/'+sitelist , 'DELETE',{}, function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send("OK");
    })
});

router.get('/list/:vp', function (req, res) {
    var username = req.params.vp;
    var query = {"filter[where][username]": username, "filter[fields][name]":true, "filter[fields][id]":true};

    netHelpers.performLoopbackAjaxRequest('/api/sitelists', 'GET',query,function (resultObject) {
        if (resultObject.error) {
            console.error(resultObject.error);
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send(resultObject);
    })
});


router.get('/get/:vp', function (req, res) {
    var modelId = req.params.vp;
    console.log("SITELISTS GET id ",modelId);
    netHelpers.performLoopbackAjaxRequest('/api/sitelists/'+modelId, 'GET',null,function (resultObject) {
        if (resultObject.error) {
            console.error(resultObject.error);
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send(resultObject);
    })
});

router.post('/save', function (req, res) {
    console.log("SITELIST/save POST");
    var sitelist = JSON.parse(req.query.siteList);
    netHelpers.performLoopbackAjaxRequest('/api/sitelists' , 'PUT', sitelist,function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }
        res.status(200).send("OK");
    })

});

module.exports = router;
