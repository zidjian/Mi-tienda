'use strict';

const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { cliente_table_name } = require( './../models/cliente.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.changeColumn( cliente_table_name, 'usuarios_idusuario', {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            field: 'usuarios_idusuario'
        } );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( cliente_table_name );
    }
};
