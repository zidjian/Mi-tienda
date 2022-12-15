'use strict';

const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { categoria_table_name } = require( './../models/categoria.model' );
const { producto_table_name } = require( './../models/producto.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( categoria_table_name, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            nombre: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            imagen: {
                allowNull: false,
                type: DataTypes.STRING
            },
            creadoEn: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'creado_en',
                defaultValue: Sequelize.NOW
            }
        } );
        await queryInterface.createTable( producto_table_name, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            nombre: {
                allowNull: false,
                type: DataTypes.STRING
            },
            precio: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            descripcion: {
                allowNull: false,
                type: DataTypes.TEXT
            },
            imagen: {
                allowNull: false,
                type: DataTypes.STRING
            },
            creadoEn: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'creado_en',
                defaultValue: Sequelize.NOW
            },
            categorias_idcategoria: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'categorias_idcategoria',
                references: {
                    model: categoria_table_name,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        } );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( categoria_table_name );
        await queryInterface.dropTable( producto_table_name );
    }
};
