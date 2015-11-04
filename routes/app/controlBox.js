var express = require('express');
var router = express.Router();

var netHelpers = require('../../lib/net-helpers');

var makeServiceCall = function(req,res,routeName, serviceHostName, servicePort){

    netHelpers.performAjaxRequest(serviceHostName, servicePort, '/' + routeName, 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            if(!resultObject.error.message){
                console.log(resultObject.traceback);
                res.status(500).send(":" + resultObject.error);
                return;
            }
            res.status(500).send(resultObject.error.message);
            console.log(resultObject.traceback);
            return;
        }

        res.status(200).send(resultObject);

    },function (error) {
        if(!error.message) {
            console.log(error);
            res.status(500).send(error);
            return;
        }
        console.log(error.message);
        res.status(500).send(error.message);
    })
};



var applyRoute = function(routeName,req,res){
    var settingsUrl = "/api/users/" + req.session.userId ;
    var settingsData =  {
        access_token: req.session.loopbackId
    };

    netHelpers.performLoopbackAjaxRequest(settingsUrl, 'GET', settingsData, function (resultObject) {
        if (resultObject.error) {
            if(!resultObject.error.message){
                console.log(resultObject.traceback);
                res.status(500).send(":" + resultObject.error);
                return;
            }
            res.status(500).send(resultObject.error.message);
            console.log(resultObject.traceback);
            return;
        }

        makeServiceCall(req,res,routeName,resultObject.serviceHostName,resultObject.servicePort);

    },function (error) {
        if(!error.message) {
            console.log(error);
            res.status(500).send(error);
            return;
        }
        console.log(error.message);
        res.status(500).send(error.message);
    })
};


router.get('/populate/:vp', function (req, res) {
    var routeName = "populate/"+req.params.vp;
    applyRoute(routeName,req,res);
});


router.get('/:vp', function (req, res) {
    var routeName = req.params.vp;
    applyRoute(routeName,req,res)
});


module.exports = router;
