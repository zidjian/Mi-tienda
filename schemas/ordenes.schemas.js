const joi = require( 'joi' );

const id = joi.number().integer();
const clientes_idcliente = joi.string();
const ordenes_idorden = joi.number().integer();
const productos_idproducto = joi.number().integer();
const cantidad = joi.number().min( 1 );

const createOrdenSchema = joi.object( {
    clientes_idcliente: clientes_idcliente.required()
} );

const getOrdenSchema = joi.object( {
    id: id.required(),
} );

const agregarElementosSchema = joi.object( {
    ordenes_idorden: ordenes_idorden.required(),
    productos_idproducto: productos_idproducto.required(),
    cantidad: cantidad.required()
} );


module.exports = { createOrdenSchema, getOrdenSchema, agregarElementosSchema };
