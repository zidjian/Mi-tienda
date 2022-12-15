const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

const { models } = require( './../libs/sequelize' );

class ClientesServices {
    constructor() {

    }

    async crear( data ) {
        const resultado = await models.Cliente.create( data, {
            include: [ 'usuario' ]
        } );
        return resultado;
    }

    async find() {
        const resultado = await models.Cliente.findAll( {
            include: [ 'usuario' ]
        } );
        return resultado;
    }

    async findOne( id ) {
        const resultado = await models.Cliente.findByPk( id );
        if( !resultado ) {
            throw boom.notFound( 'Cliente no encontrado' );
        }
        return resultado;
    }

    async actualizar( id, cambios ) {
        const registro = await this.findOne( id );
        const resultado = await registro.update( cambios );
        return resultado;
    }

    async eliminar( id ) {
        const registro = await this.findOne( id );
        await registro.destroy();
        return { id };
    }
}

module.exports = ClientesServices;
