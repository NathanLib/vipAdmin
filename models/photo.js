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
