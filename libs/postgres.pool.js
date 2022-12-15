const { Pool } = require('pg');

const { config } = require( './../config/config' );

const USER = encodeURIComponent( config.dbUser );
const PASSWORD = encodeURIComponent( config.dbPassword );

// La url de conexión deben tener: tipo_dase_datos://usuario:contraseña@host:puerto/nombre_base_datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

    const pool = new Pool( { connectionString: URI } );

module.exports = pool;
