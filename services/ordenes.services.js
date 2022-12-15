const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

const { models } = require( './../libs/sequelize' );

class OrdenesServices {
    constructor() {

    }

    async crear( data ) {
        const resultado = await models.Orden.create( data );
        return resultado;
    }

    async agregarElemento( data ) {
        const resultado = await models.OrdenProducto.create( data );
        return resultado;
    }

    async find() {
        const resultado = await models.Orden.findAll();
        return resultado;
    }

    async findOne( id ) {
        const resultado = await models.Orden.findByPk( id, {
            include: [
                {
                    association: "cliente",
                    include: [ 'usuario' ]
                },
                'elemento'
            ]
        } );
        if( !resultado ) {
            throw boom.notFound( 'Orden no encontrado' );
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

module.exports = OrdenesServices;
