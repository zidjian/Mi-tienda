const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

const { models } = require( './../libs/sequelize' );

class CategoriasServices {
    constructor() {

    }

    async crear( data ) {
        const resultado = await models.Categoria.create( data );
        return resultado;
    }

    async find() {
        const resultado = await models.Categoria.findAll();
        return resultado;
    }

    async findOne( id ) {
        const resultado = await models.Categoria.findByPk( id,  {
            include: [ 'producto' ]
        }  );
        if( !resultado ) {
            throw boom.notFound( 'Categoria no encontrado' );
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

module.exports = CategoriasServices;
