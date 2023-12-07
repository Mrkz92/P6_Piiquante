const mysql2 = require("mysql2");
const { MARIADB } = require("./env");

if (!MARIADB) throw "MARIADB doit être configuré dans le fichier .env.local";

// Convertir la chaîne JSON en objet JavaScript
const mariadbConfig = JSON.parse(MARIADB);

// Créer un pool de connexions
const pool = mysql2.createPool(mariadbConfig);

// Tenter d'obtenir une connexion à partir du pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : ", err);
  } else {
    console.log("Connexion à la base de données réussie");

    // Libérer la connexion pour la remettre dans le pool une fois que vous avez fini de l'utiliser
    connection.release();
  }
});

module.exports = pool;
