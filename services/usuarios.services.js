const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

const { models } = require( './../libs/sequelize' );

class UsersServices {
    constructor() {

    }

    async crear( data ) {
        const usuario = await models.Usuario.create( data );
        return usuario;
    }

    async find() {
        const resultado = await models.Usuario.findAll( {
            include: [ 'cliente' ]
        } );
        return resultado;
    }

    async findOne( id ) {
        const usuario = await models.Usuario.findByPk( id );
        if( !usuario ) {
            throw boom.notFound( 'Usuario no encontrado' );
        }
        return usuario;
    }

    async actualizar( id, cambios ) {
        const usuario = await this.findOne( id );
        const resultado = await usuario.update( cambios );
        return resultado;
    }

    async eliminar( id ) {
        const usuario = await this.findOne( id );
        await usuario.destroy();
        return { id };
    }
}

module.exports = UsersServices;
