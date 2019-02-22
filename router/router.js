let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let PhotosController = require('./../controllers/PhotosController');
let ConnexionController = require('./../controllers/ConnexionController');

// Routes
module.exports = function(app){

    // Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

    // Connexion
    app.get('/connexion', ConnexionController.Connexion);
    app.post('/authentification', ConnexionController.Authentification);
    app.get('/deconnexion', ConnexionController.Deconnexion);

    //Accès vérifié
    // VIP
    app.get('/vips', ConnexionController.Verification, VipController.Ajout);
    app.get('/vips/ajoutVip', ConnexionController.Verification, VipController.AjoutVip);
    
    app.get('/vips/modifier', ConnexionController.Verification, VipController.Modifier);
    app.get('/vips/supprimer', ConnexionController.Verification, VipController.Supprimer);

    // Photos
    app.get('/photos', ConnexionController.Verification, PhotosController.Ajout);
    app.get('/photos/supprimer', ConnexionController.Verification, PhotosController.Supprimer);
    //Fin accès vérifié

    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
