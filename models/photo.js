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

module.exports.getPhotosVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM photo p";
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

module.exports.insertPhotoVip = function(idPhoto, numeroVip, data, callback) {
    db.getConnection(function(err, connexion) {

        idPhoto = idPhoto + 1;

        if (!err) {
            let sql = "INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE)";
            sql = sql + " VALUES ("+idPhoto+", "+numeroVip+", '"+data.PHOTO_SUJET+"', '"+data.PHOTO_COMMENTAIRE+"', '"+data.PHOTO_ADRESSE+"');";

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

            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
