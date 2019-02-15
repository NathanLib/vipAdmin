let model = require("../models/vip.js");
let async = require("async");

module.exports.Ajout = function(request, response){
    response.title = 'PHOTOS Admin';

    response.render('ajoutPhotos', response);
} ;

module.exports.Supprimer = function(request, response){
    response.title = 'PHOTOS Admin';

    response.render('supprPhotos', response);
} ;
