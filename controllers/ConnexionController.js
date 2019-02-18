let model = require("../models/parametres.js");
let Cryptr = require('cryptr');
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');
let async = require("async");

module.exports.Connexion = function(request, response){
    response.title = 'Connexion Admin';

    response.render('connexion', response);
} ;

module.exports.Authentification = function(request, response){
    response.title = 'Connexion Admin';

    model.getAuthentification(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        if (request.body.login == result[0]['LOGIN']) {
            if (request.body.mdp == cryptr.decrypt(result[0]['PASSWD'])) {
                request.session.utilisateur = request.body.login;
            }
            else {
                response.erreurConnexion = "Le login ou le mdp est incorrect";
            }
        }
        else {
            response.erreurConnexion = "Le login ou le mdp est incorrect";
        }

        response.render('connexion', response);
    } );
}

module.exports.Deconnexion = function(request, response){
    response.title = 'Deconnexion Admin';
    request.session.destroy();
    response.redirect('/accueil');
} ;
