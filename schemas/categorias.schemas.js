const joi = require( 'joi' );

const id = joi.string();
const nombre = joi.string().min( 3 ).max( 15 );
const imagen = joi.string().uri();

const createCategoriaSchema = joi.object( {
    nombre: nombre.required(),
    imagen: imagen.required()
} );
const updateCategoriaSchema = joi.object( {
    nombre: nombre,
    imagen: imagen
} );
const getCategoriaSchema = joi.object( {
    id: id.required(),
} );


module.exports = { createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema };
