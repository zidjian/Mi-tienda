const Sequelize = require( 'sequelize' );

const { config } = require( './../config/config' );
const setupModels = require( './../db/models/index' );

const USER = encodeURIComponent( config.dbUser );
const PASSWORD = encodeURIComponent( config.dbPassword );

// La url de conexión deben tener: tipo_dase_datos://usuario:contraseña@host:puerto/nombre_base_datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize( URI, {
    dialect: 'postgres',
    logging: true
} );

setupModels( sequelize );

module.exports = sequelize;
