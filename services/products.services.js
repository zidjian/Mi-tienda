const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

class ProductsServices {
    constructor() {
        this.productos = [];
        this.generar();
    }

    generar() {
        const limit = 100;

        for( let i = 0; i < limit; i++ ) {
            this.productos.push( {
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt( faker.commerce.price(), 10 ),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            } );
        }
    }

    async crear( data ) {
        const nuevo_producto = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.productos.push( nuevo_producto );
        return nuevo_producto;
    }

    async find() {
        return new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( this.productos );
            } );
        } );
    }

    async findOne( id ) {
        const producto = this.productos.find( item => item.id === id );

        if( !producto ) {
            throw boom.notFound( 'Producto no encontrado' );
        }
        if( producto.isBlock ) {
            throw boom.conflict( 'Producto bloqueado' );
        }
        return producto;
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
