let model = require("../models/photo.js");
let async = require("async");

module.exports.Ajout = function(request, response){
    response.title = 'PHOTOS Admin';

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
        response.render('ajoutPhotos', response);
    }
);
} ;

module.exports.Supprimer = function(request, response){
    response.title = 'PHOTOS Admin';
    let numero = request.params.numero;

    if (numero == -1) {
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

            response.numeroVip = numero;
            response.listVips = result[0];
            response.render('supprPhotos', response);
        }
    );
}
else {
    async.parallel([
        function(callback){
            model.getAllVips(function(err,result) {callback(null, result)});
        },
        function(callback){
            model.getPhotosVip(numero, function(err,result) {callback(null, result)});
        }

    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.numeroVip = numero;
        response.listVips = result[0];
        response.photos = result[1];

        response.render('supprPhotos', response);
    }
);
}
} ;
