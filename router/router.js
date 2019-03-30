let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let PhotosController = require('./../controllers/PhotosController');
let ConnexionController = require('./../controllers/ConnexionController');
let UploadController = require('./../controllers/UploadController');

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
    app.post('/vips/ajoutVip', ConnexionController.Verification, UploadController.UploadImage,VipController.AjoutVip);

    app.get('/vips/modifier/:numero', ConnexionController.Verification, VipController.ModifierDetail);
    app.post('/vips/modifier/:numero/update', ConnexionController.Verification, UploadController.UploadImage,VipController.UpdateDetail);

    app.get('/vips/supprimer', ConnexionController.Verification, VipController.Supprimer);
    app.post('/vips/supprimerVip', ConnexionController.Verification, VipController.SupprimerVip);

    // Photos
    app.get('/photos', ConnexionController.Verification, PhotosController.Ajout);
    app.post('/photos/ajoutPhotos', ConnexionController.Verification, UploadController.UploadImage, PhotosController.InsertPhoto);

    app.get('/photos/supprimer/:numero', ConnexionController.Verification, PhotosController.Supprimer);
    app.post('/photos/supprimerPhotos', ConnexionController.Verification, PhotosController.DeletePhoto);
    //Fin accès vérifié

    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);
};
