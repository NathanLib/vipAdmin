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

    var dataForm = request.body;
    var image = request.file.filename;

    async.series([
        function(callback){
            model.insertVip(dataForm, function(err,result) {callback(null, result)});
        }

    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        model.insertVipPhoto(result[0].insertId, dataForm, image, function(err,result) {});

        response.addVip = dataForm.VIP_PRENOM + " " + dataForm.VIP_NOM;
        response.render('vipsConfirmation', response);
    }
);
} ;

module.exports.ModifierDetail = function(request, response){
    response.title = 'VIPS Admin';
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
            response.render('modifVipsDetails', response);
        }
    );
}
else {
    async.parallel([
        function(callback){
            model.getAllNationalites(function(err,result) {callback(null, result)});
        },
        function(callback){
            model.getDetailsVip(numero, function(err,result) {callback(null, result)});
        },

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
        response.listNationalites = result[0];
        response.details = result[1][0];
        response.listVips = result[2];
        response.render('modifVipsDetails', response);
    }
);
}
} ;

module.exports.UpdateDetail = function(request, response){
    response.title = 'VIPS Admin';

    var dataForm = request.body;
    var image = request.file.filename;

    async.series([
        function(callback){
            model.updateInfoVip(dataForm, image, function(err,result) {callback(null, result)});
        }
    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.updateVip = dataForm.VIP_PRENOM + " " + dataForm.VIP_NOM ;
        response.render('vipsConfirmation', response);
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
        response.render('supprVips', response);
    }
);
} ;

module.exports.SupprimerVip = function(request, response){
    response.title = 'VIPS Admin';

    var dataForm = request.body;

    async.series([
        function(callback){
            model.getInfoVip(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
        },
        function(callback){
            model.deleteVip(dataForm.VIP_NUMERO, function(err,result) {callback(null, result)});
        },


    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.deleteVip = result[0][0]['VIP_PRENOM'] + " " + result[0][0]['VIP_NOM'];
        response.render('vipsConfirmation', response);
    }
);
} ;
