'use strict';

const { cliente_table_name, cliente_schema } = require( './../models/cliente.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( cliente_table_name, cliente_schema );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( cliente_table_name );
    }
};
