let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let PhotosController = require('./../controllers/PhotosController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/vips', VipController.Ajout);
    app.get('/vips/modifier', VipController.Modifier);
    app.get('/vips/supprimer', VipController.Supprimer);

 // Photos
   app.get('/photos', PhotosController.Ajout);
   app.get('/photos/supprimer', PhotosController.Supprimer);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
