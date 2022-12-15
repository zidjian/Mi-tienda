'use strict';

const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { orden_table_name } = require( './../models/orden.model' );
const { cliente_table_name } = require( './../models/cliente.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( orden_table_name, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            creadoEn: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'creado_en',
                defaultValue: Sequelize.NOW
            },
            clientes_idcliente: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'clientes_idcliente',
                references: {
                    model: cliente_table_name,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        } );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( orden_table_name );
    }
};
