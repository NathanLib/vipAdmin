let db = require('../configDb');

module.exports.getAllVips = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NUMERO, VIP_NOM, VIP_PRENOM FROM vip ORDER BY VIP_NOM;";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getInfoVip = function(numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_PRENOM FROM vip WHERE VIP_NUMERO="+numero+";";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getPhotosVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT p.PHOTO_NUMERO, p.PHOTO_ADRESSE, p.PHOTO_SUJET FROM photo p";
            sql = sql + " WHERE p.VIP_NUMERO="+number+";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getMaxIdPhoto = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT MAX(p.PHOTO_NUMERO) as maxIdPhoto, p.VIP_NUMERO FROM photo p";
            sql = sql + " WHERE VIP_NUMERO="+number+";";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.insertPhotoVip = function(idPhoto, numeroVip, data, image, callback) {
    db.getConnection(function(err, connexion) {

        idPhoto = idPhoto + 1;

        if (!err) {
            let sql = "INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE)";
            sql = sql + " VALUES ("+idPhoto+", "+numeroVip+", '"+data.PHOTO_SUJET.replace(/'/g, "\\'")+"', '"+data.PHOTO_COMMENTAIRE.replace(/'/g, "\\'")+"', '"+image+"');";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.deletePhotoVip = function(arrayNumPhoto, numeroVip, callback) {
    db.getConnection(function(err, connexion) {

        if (!err) {
            let sql = "DELETE FROM photo where PHOTO_NUMERO IN ("+arrayNumPhoto+") AND VIP_NUMERO="+numeroVip+";";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

// Réorganisation des numéros des photos dans la BD
module.exports.updatePhotoNumber = function(numeroPhoto, numeroVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "";

            for (var i = 0; i < numeroPhoto.length; i++) {
                sql = sql + " UPDATE photo"
                sql = sql + " SET PHOTO_NUMERO = GREATEST(1, PHOTO_NUMERO - 1)";
                sql = sql + " WHERE VIP_NUMERO="+numeroVip+" AND PHOTO_NUMERO>"+numeroPhoto[i]+";";
            }

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

module.exports.updatePhotoNumberUnique = function(numeroPhoto, numeroVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = " UPDATE photo"
            sql = sql + " SET PHOTO_NUMERO = GREATEST(1, PHOTO_NUMERO - 1)";
            sql = sql + " WHERE VIP_NUMERO="+numeroVip+" AND PHOTO_NUMERO>"+numeroPhoto+";";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
