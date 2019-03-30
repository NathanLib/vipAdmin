let multer = require('multer');
/*
* Définition des variables nécessaires à l'upload des images
*/
var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./public/images/vip");
     },
     filename: function(req, file, callback) {
         callback(null, file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).single("PHOTO_ADRESSE");

/*
* Définition des fonctions
*/
module.exports.UploadImage = function (request, response, next) {

    upload(request, response, function (error) {
        if(error) {
          console.log(error);
          return;
        }

        console.log("Photo importée avec succès");
        next();
    });
}
