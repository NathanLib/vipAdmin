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

module.exports.getAllNationalites = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT n.NATIONALITE_NUMERO, n.NATIONALITE_NOM FROM nationalite n";
            sql = sql + " ORDER BY n.NATIONALITE_NOM;";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}


module.exports.insertVip = function(data, callback) {
    db.getConnection(function (err, connexion) {
        console.log(data);
        if (!err) {
            let sql = "INSERT INTO vip SET VIP_NOM="+data['VIP_NOM']+", VIP_PRENOM="+[data.VIP_PRENOM]+", NATIONALITE_NUMERO="+[data.NATIONALITE_NUMERO]+", VIP_DATE_INSERTION="+[data.VIP_DATE_INSERTION]+";";

            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getDetailsVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO,v.NATIONALITE_NUMERO, v.VIP_NOM, v.VIP_PRENOM, v.VIP_SEXE, v.VIP_NAISSANCE, v.VIP_TEXTE, p.PHOTO_NUMERO, p.PHOTO_SUJET, p.PHOTO_COMMENTAIRE, p.PHOTO_ADRESSE, n.NATIONALITE_NOM FROM vip v ";
            sql = sql + " JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO";
            sql = sql + " JOIN nationalite n ON n.NATIONALITE_NUMERO=v.NATIONALITE_NUMERO";
            sql = sql + " WHERE p.PHOTO_NUMERO=1 AND v.VIP_NUMERO="+number+";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
