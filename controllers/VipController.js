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

module.exports.AjoutVip = function(request, response){
    response.title = 'VIPS Admin';

    console.log(request.body);
//
//    async.parallel([
//        function(callback){
//            model.insertVip(function(err,result) {callback(data, result)});
//        }
//    ],
//
//    function(err, result){
//        if (err) {
//            console.log(err);
//            return;
//        }
//
//        response.insert = result[0];
//        response.render('home', response);
//    }
//);
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

module.exports.ModifierDetail = function(request, response){
    response.title = 'VIPS Admin';
    let numero = request.params.numero;

    async.parallel([
        function(callback){
            model.getAllNationalites(function(err,result) {callback(null, result)});
        },
        function(callback){
            model.getDetailsVip(numero, function(err,result) {callback(null, result)});
        }
    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.listNationalites = result[0];
        response.details = result[1][0];
        response.render('modifVipsDetails', response);
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
