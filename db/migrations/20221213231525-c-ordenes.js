'use strict';

const { orden_table_name, orden_schema } = require( './../models/orden.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( orden_table_name, orden_schema );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( orden_table_name );
    }
};
