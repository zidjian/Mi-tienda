'use strict';

const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { cliente_table_name } = require( './../models/cliente.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( cliente_table_name, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            nombres: {
                allowNull: false,
                type: DataTypes.STRING
            },
            apellidos: {
                allowNull: false,
                type: DataTypes.STRING
            },
            celular: {
                allowNull: false,
                type: DataTypes.STRING
            },
            creadoEn: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'creado_en',
                defaultValue: Sequelize.NOW
            },
            usuarios_idusuario: {
                allowNull: false,
                type: DataTypes.INTEGER,
                unique: true,
                field: 'usuarios_idusuario',
                references: {
                    model: usuario_table_name,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        } );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( cliente_table_name );
    }
};
