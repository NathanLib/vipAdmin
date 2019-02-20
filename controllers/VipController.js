let model = require("../models/vip.js");
let async = require("async");

module.exports.Ajout = function(request, response){
    response.title = 'VIPS Admin';

    async.parallel([
        function(callback){
            model.getAllNationalites(function(err,result) {callback(null, result)});
        }

    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.listNationalites = result[0];
        response.render('ajoutVips', response);
    }
);
} ;

module.exports.Modifier = function(request, response){
    response.title = 'VIPS Admin';

    async.parallel([
        function(callback){
            model.getAllVips(function(err,result) {callback(null, result)});
        }
    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.listVips = result[0];
        response.render('modifVips', response);
    }
);
} ;


module.exports.Supprimer = function(request, response){
    response.title = 'VIPS Admin';

    async.parallel([
        function(callback){
            model.getAllVips(function(err,result) {callback(null, result)});
        }


    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.listVips = result[0];
        response.render('modifVips', response);
    }
);
} ;
