const joi = require( 'joi' );

const id = joi.string();
const email = joi.string();
const contrasenia = joi.string();
const rol = joi.string().min(5);

const createUsuarioSchema = joi.object( {
    email: email.required(),
    contrasenia: contrasenia.required(),
    rol: rol.required()
} );
const updateUsuarioSchema = joi.object( {
    email: email,
    contrasenia: contrasenia,
    rol: rol
} );
const getUsuarioSchema = joi.object( {
    id: id.required(),
} );


module.exports = { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema };
