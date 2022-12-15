'use strict';

const { categoria_table_name, categoria_schema } = require( './../models/categoria.model' );
const { producto_table_name, producto_schema } = require( './../models/producto.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( categoria_table_name, categoria_schema );
        await queryInterface.createTable( producto_table_name, producto_schema );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( categoria_table_name );
        await queryInterface.dropTable( producto_table_name );
    }
};
