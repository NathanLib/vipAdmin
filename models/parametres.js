let db = require('../configDb');

module.exports.getAuthentification = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT LOGIN, PASSWD FROM parametres;";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
