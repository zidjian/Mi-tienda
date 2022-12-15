'use strict';

const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { usuario_table_name } = require( './../models/user.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( usuario_table_name, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            contrasenia: {
                allowNull: false,
                type: DataTypes.STRING
            },
            rol: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: 'customer'
            },
            creadoEn: {
                allowNull: false,
                type: DataTypes.DATE,
                File: 'creado_en',
                defaultValue: Sequelize.NOW
            }
        } );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( usuario_table_name );
    }
};
