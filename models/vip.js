let db = require('../configDb');
let moment = require('moment');

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

module.exports.insertVip = function(data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "INSERT INTO vip (NATIONALITE_NUMERO, VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION)";
            sql = sql + " VALUES ("+data.NATIONALITE_NUMERO+", UPPER('"+data.VIP_NOM+"'), '"+data.VIP_PRENOM+"', '"+data.VIP_SEXE+"', '"+data.VIP_NAISSANCE+"', '"+data.VIP_TEXTE+"', '"+moment().format('YYYY-MM-DD hh:mm:ss')+"');";

            console.log(sql);

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.insertVipPhoto = function(numeroVip, data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {

            let sql = "INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE)";
            sql = sql + " VALUES (1, "+numeroVip+", '"+data.PHOTO_SUJET+"', '"+data.PHOTO_COMMENTAIRE+"', '"+data.PHOTO_ADRESSE+"');";

            //console.log(sql);

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.updateInfoVip = function(data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            // WARNING: Demander pour l'échapement des caractères : \'
            let sql = "UPDATE vip v, photo p";
            sql = sql + " SET v.NATIONALITE_NUMERO="+data.NATIONALITE_NUMERO+", v.VIP_NOM=UPPER('"+data.VIP_NOM+"'), v.VIP_PRENOM='"+data.VIP_PRENOM+"', v.VIP_SEXE='"+data.VIP_SEXE+"',";
            sql = sql + " v.VIP_NAISSANCE='"+data.VIP_NAISSANCE+"', v.VIP_TEXTE='"+data.VIP_TEXTE.replace("'", "\\'")+"', p.PHOTO_SUJET='"+data.PHOTO_SUJET+"',";
            sql = sql + " p.PHOTO_COMMENTAIRE='"+data.PHOTO_COMMENTAIRE.replace("'", "\\'")+"', p.PHOTO_ADRESSE='"+data.PHOTO_ADRESSE+"'";
            sql = sql + " WHERE v.VIP_NUMERO=p.VIP_NUMERO AND p.PHOTO_NUMERO=1 AND v.VIP_NUMERO="+data.NUMERO_VIP+";";

            console.log(sql);

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
