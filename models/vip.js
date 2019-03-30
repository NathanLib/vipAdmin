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
            sql = sql + " VALUES ("+data.NATIONALITE_NUMERO+", UPPER('"+data.VIP_NOM+"'), '"+data.VIP_PRENOM+"', '"+data.VIP_SEXE+"', '"+data.VIP_NAISSANCE+"', '"+data.VIP_TEXTE.replace(/'/g, "\\'")+"', '"+moment().format('YYYY-MM-DD hh:mm:ss')+"');";

            //console.log(sql);

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.insertVipPhoto = function(numeroVip, data, image, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {

            let sql = "INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE)";
            sql = sql + " VALUES (1, "+numeroVip+", '"+data.PHOTO_SUJET.replace(/'/g, "\\'")+"', '"+data.PHOTO_COMMENTAIRE.replace(/'/g, "\\'")+"', '"+image+"');";

            //console.log(sql);

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.updateInfoVip = function(data, image, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {

            let sql = "UPDATE vip v, photo p";
            sql = sql + " SET v.NATIONALITE_NUMERO="+data.NATIONALITE_NUMERO+", v.VIP_NOM=UPPER('"+data.VIP_NOM+"'), v.VIP_PRENOM='"+data.VIP_PRENOM+"', v.VIP_SEXE='"+data.VIP_SEXE+"',";
            sql = sql + " v.VIP_NAISSANCE='"+data.VIP_NAISSANCE+"', v.VIP_TEXTE='"+data.VIP_TEXTE.replace(/'/g, "\\'")+"', p.PHOTO_SUJET='"+data.PHOTO_SUJET+"',";
            sql = sql + " p.PHOTO_COMMENTAIRE='"+data.PHOTO_COMMENTAIRE.replace(/'/g, "\\'")+"', p.PHOTO_ADRESSE='"+image+"'";
            sql = sql + " WHERE v.VIP_NUMERO=p.VIP_NUMERO AND p.PHOTO_NUMERO=1 AND v.VIP_NUMERO="+data.NUMERO_VIP+";";

            //console.log(sql);

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.deleteVip = function(numeroVip, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {

            let sql = "SET FOREIGN_KEY_CHECKS=0; " +
                "DELETE vip, couturier, chanteur, acteur, joue, realisateur, mariage, liaison, apoursujet, comporte, photo, mannequin, apouragence, defiledans " +
                "FROM vip " +
                "LEFT JOIN couturier ON vip.VIP_NUMERO=couturier.VIP_NUMERO " +
                "LEFT JOIN chanteur ON vip.VIP_NUMERO=chanteur.VIP_NUMERO " +
                "LEFT JOIN acteur ON vip.VIP_NUMERO=acteur.VIP_NUMERO " +
                "LEFT JOIN joue ON vip.VIP_NUMERO=joue.VIP_NUMERO " +
                "LEFT JOIN realisateur ON vip.VIP_NUMERO=realisateur.VIP_NUMERO " +
                "LEFT JOIN mariage ON vip.VIP_NUMERO=mariage.VIP_NUMERO " +
                "LEFT JOIN liaison ON vip.VIP_NUMERO=liaison.VIP_NUMERO " +
                "LEFT JOIN apoursujet ON vip.VIP_NUMERO=apoursujet.VIP_NUMERO " +
                "LEFT JOIN comporte ON vip.VIP_NUMERO=comporte.VIP_NUMERO " +
                "LEFT JOIN photo ON vip.VIP_NUMERO=photo.VIP_NUMERO " +
                "LEFT JOIN mannequin ON vip.VIP_NUMERO=mannequin.VIP_NUMERO " +
                "LEFT JOIN apouragence ON vip.VIP_NUMERO=apouragence.VIP_NUMERO " +
                "LEFT JOIN defiledans ON vip.VIP_NUMERO=defiledans.VIP_NUMERO " +
                "WHERE vip.VIP_NUMERO="+numeroVip+"; " +
                "SET FOREIGN_KEY_CHECKS=1;";

            //console.log(sql);

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
