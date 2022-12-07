const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

class CategoriesServices {
    constructor() {
        this.categorias = [];
        this.generar();
    }

    generar() {
        const limit = 10;

        for( let i = 0; i < limit; i++ ) {
            this.categorias.push( {
                id_categoria: faker.datatype.uuid(),
                categoria: faker.commerce.productMaterial()
            } );
        }
    }

    // async crear( data ) {
    //     const nueva_categoria = {
    //         id: faker.datatype.uuid(),
    //         ...data
    //     }
    //     this.categorias.push( nueva_categoria );
    //     return nueva_categoria;
    // }

    async find() {
        return new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( this.categorias );
            } );
        } );
    }

    async findOne( id ) {
        const categoria = this.categorias.find( item => item.id_categoria === id );

        if( !categoria ) {
            throw boom.notFound( 'Categoria no encontrada' );
        }
        return categoria;
    }

    // async actualizar( id, cambios ) {
    //     const posicion = this.categorias.findIndex( item => item.id === id );
    //     if( posicion === -1 ) {
    //         throw boom.notFound( 'Categoria no encontrado' );
    //     }
    //     const categoria = this.categorias[ posicion ];
    //     this.categorias[ posicion ] = {
    //         ...categoria,
    //         ...cambios
    //     };
    //     return this.categorias[ posicion ];
    // }

    // async eliminar( id ) {
    //     const ubicacion = this.categorias.findIndex( item => item.id === id );
    //     if( posicion === -1 ) {
    //         throw boom.notFound( 'Categoria no encontrado' );
    //     }
    //     this.categorias.splice( ubicacion, 1 );
    //     return { id };
    // }
}

module.exports = CategoriesServices;
