const joi = require( 'joi' );

const id = joi.string().uuid();
const categoria = joi.string().min( 3 ).max( 15 );

const createCategoriaSchema = joi.object( {
    categoria: categoria.required()
} );
const updateCategoriaSchema = joi.object( {
    categoria: categoria.required()
} );
const getCategoriaSchema = joi.object( {
    id_categoria: id.required(),
} );


module.exports = { createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema };
