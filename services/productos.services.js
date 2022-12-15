const faker = require( 'faker' );
const { Op } = require( 'sequelize' );
const boom = require( '@hapi/boom' );

const { models } = require( './../libs/sequelize' );

class ProductsServices {
    constructor() {
    }
    async crear( data ) {
        const resultado = await models.Producto.create( data, {
            include: [ 'categoria' ]
        }  );
        return resultado;
    }

    async find( query ) {
        const opciones = {
            include: [ 'categoria' ],
            where: {}
        };

        const { limit, offset } = query;
        if( limit && offset ) {
            opciones.limit = limit;
            opciones.offset = offset;
        }

        const { precio } = query;
        if( precio ) {
            opciones.where.precio = precio;
        }

        const { precio_min, precio_max } = query;
        if( precio_min && precio_max ) {
            opciones.where.precio = {
                [ Op.gte ]: precio_min,
                [ Op.lte ]: precio_max
            };
        }

        const resultado = await models.Producto.findAll( opciones );
        return resultado;
    }

    async findOne( id ) {
        const resultado = await models.Producto.findByPk( id );
        if( !resultado ) {
            throw boom.notFound( 'Producto no encontrado' );
        }
        return resultado;
    }

    async actualizar( id, cambios ) {
        const posicion = this.productos.findIndex( item => item.id === id );
        if( posicion === -1 ) {
            throw boom.notFound( 'Producto no encontrado' );
        }
        const producto = this.productos[ posicion ];
        this.productos[ posicion ] = {
            ...producto,
            ...cambios
        };
        return this.productos[ posicion ];
    }

    async eliminar( id ) {
        const ubicacion = this.productos.findIndex( item => item.id === id );
        if( posicion === -1 ) {
            throw boom.notFound( 'Producto no encontrado' );
        }
        this.productos.splice( ubicacion, 1 );
        return { id };
    }
}

module.exports = ProductsServices;
