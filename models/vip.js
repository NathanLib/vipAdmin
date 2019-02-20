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
