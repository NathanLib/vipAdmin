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
); } ;

module.exports.InsertPhoto = function(request, response){
    response.title = 'PHOTOS Admin';

    var dataForm = request.body;

    async.series([
        function(callback){
            model.getMaxIdPhoto(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
        }

    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        let infoPhotoVip = result[0][0];

        if (infoPhotoVip.maxIdPhoto == null) {
            model.insertPhotoVip(0, dataForm.VIP_NUMERO, dataForm, function(err,result) {});
        }
        else {
            model.insertPhotoVip(infoPhotoVip.maxIdPhoto, infoPhotoVip.VIP_NUMERO, dataForm, function(err,result) {});
        }

        response.render('ajoutVipsConfirmation', response);
    }
); } ;

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
); } } ;

module.exports.DeletePhoto = function(request, response){
    response.title = 'PHOTOS Admin';

    var dataForm = request.body;

    if (dataForm.aSupprimer === undefined) {
        response.render('home', response);
    }
    else {
        let values = dataForm.aSupprimer;

        async.series([

            function(callback){
                model.deletePhotoVip(values, dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
            },

            function(callback){
                model.getPhotosVip(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
            }
        ],

        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
/*
            var arrayNumPhoto = new Array();

            for (var i = 0; i < result[1].length; i++) {
                arrayNumPhoto.push(result[1][i].PHOTO_NUMERO);
            }
*/
            if (result[1].length > 0) {
                if (result[1].length > 1) {
                    for (var i = values.length - 1; i >= 0; i--) {
                        console.log(values[i]);

                        model.updatePhotoNumber(values[i], dataForm.VIP_NUMERO, function(err,result) {});
                    }
                }
                else {
                    model.updatePhotoNumber(1, dataForm.VIP_NUMERO, function(err,result) {});
                }
            }

            response.render('ajoutVipsConfirmation', response);
        }
    ) } ; } ;
