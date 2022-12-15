'use strict';

const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { orden_producto_table_name } = require( './../models/orden_producto.model' );
const { producto_table_name } = require( './../models/producto.model' );
const { orden_table_name } = require( './../models/orden.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( orden_producto_table_name, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            cantidad: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            creadoEn: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'creado_en',
                defaultValue: Sequelize.NOW
            },
            ordenes_idorden: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'ordenes_idorden',
                references: {
                    model: orden_table_name,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            productos_idproducto: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'productos_idproducto',
                references: {
                    model: producto_table_name,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        } );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( orden_producto_table_name );
    }
};
