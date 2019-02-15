let model = require("../models/vip.js");
let async = require("async");

module.exports.Ajout = function(request, response){
    response.title = 'VIPS Admin';

    response.render('ajoutVips', response);
} ;

module.exports.Modifier = function(request, response){
    response.title = 'VIPS Admin';

    response.render('modifVips', response);
} ;

module.exports.Supprimer = function(request, response){
    response.title = 'VIPS Admin';

    response.render('supprVips', response);
} ;
