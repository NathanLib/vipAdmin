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

    async.parallel([
        function(callback){
            model.getMaxIdPhoto(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
        },

        function(callback){
            model.getInfoVip(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
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

        response.addPhotoVip = result[1][0]['VIP_PRENOM'] + " " + result[1][0]['VIP_NOM'];
        response.render('photosConfirmation', response);
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
        response.aucunePhoto = "Veuillez sélectionner au moins une photo à supprimer avant de cliquer sur valider !";
        response.render('photosConfirmation', response);
    }
    else {
        let values = dataForm.aSupprimer;

        async.series([
            function(callback){
                model.deletePhotoVip(values, dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
            },

            function(callback){
                model.getPhotosVip(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
            },

            function(callback){
                model.getInfoVip(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
            }

        ],

        function(err, result){
            if (err) {
                console.log(err);
                return;
            }

            if (result[1].length > 0) {

                if (values.length > 1) {

                    var valuesInverse = values.reverse();

                    model.updatePhotoNumber(valuesInverse, dataForm.VIP_NUMERO, function(err,result) {});
                }
                else {

                    model.updatePhotoNumberUnique(values, dataForm.VIP_NUMERO, function(err,result) {});

                }

                response.number = values.length;
                response.deletePhotoVip = result[2][0]['VIP_PRENOM'] + " " + result[2][0]['VIP_NOM'];
                response.render('photosConfirmation', response);

            }
        } ); } };
