const joi = require( 'joi' );

const id = joi.number().integer();
const nombre = joi.string().min( 3 ).max( 15 );
const precio = joi.number().integer().min( 10 );
const descripcion = joi.string().min( 10 );
const imagen = joi.string().uri();
const categorias_idcategoria = joi.number().integer();

const limit = joi.number().integer();
const offset = joi.number().integer();
const precio_min = joi.number().integer();
const precio_max = joi.number().integer();

const createProductoSchema = joi.object( {
    nombre: nombre.required(),
    precio: precio.required(),
    descripcion: descripcion.required(),
    imagen: imagen.required(),
    categoria: joi.object( {
        nombre: nombre.required(),
        imagen: imagen.required()
    } ),
    categorias_idcategoria: categorias_idcategoria,
} );

const updateProductoSchema = joi.object( {
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
    imagen: imagen,
    categorias_idcategoria: categorias_idcategoria,
} );

const getProductoSchema = joi.object( {
    id: id.required(),
} );

const paginacionProductosSchema = joi.object( {
    limit: limit,
    offset: offset,
    precio: precio,
    precio_min: precio_min,
    precio_max: joi.alternatives().conditional( 'precio_min', {
        is: joi.number().integer(),
        then: precio_max.required()
    } )
} );


module.exports = { createProductoSchema, updateProductoSchema, getProductoSchema, paginacionProductosSchema };
