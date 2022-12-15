'use strict';

const { usuario_table_name, usuario_schema } = require( './../models/user.model' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable( usuario_table_name, usuario_schema );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable( usuario_table_name );
    }
};
