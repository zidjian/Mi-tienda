const Sequelize = require( 'sequelize' );

const { config } = require( './../config/config' );
const setupModels = require( './../db/models/index' );

const opciones = {
    dialect: 'postgres',
    logging: config.isProd ? false : true,
}

if( config.isProd ) {
    opciones.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    }
}


const sequelize = new Sequelize( config.dbUrl, opciones );

setupModels( sequelize );

module.exports = sequelize;
