'use strict';

const { orden_producto_table_name, orden_producto_schema } = require( './../models/orden_producto.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( orden_producto_table_name, orden_producto_schema );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( orden_producto_table_name );
    }
};
