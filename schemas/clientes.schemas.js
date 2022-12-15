const joi = require( 'joi' );

const id = joi.string();
const nombres = joi.string();
const apellidos = joi.string();
const celular = joi.string();
const usuarios_idusuario = joi.number();
const email = joi.string();
const contrasenia = joi.string();
const rol = joi.string().min(5);

const createClienteSchema = joi.object( {
    nombres: nombres.required(),
    apellidos: apellidos.required(),
    celular: celular.required(),
    usuario: joi.object({
        email: email.required(),
        contrasenia: contrasenia.required(),
        rol: rol.required()
    }),
    usuarios_idusuario: usuarios_idusuario
} );
const updateClienteSchema = joi.object( {
    nombres,
    apellidos,
    celular,
    usuarios_idusuario
} );
const getClieteSchema = joi.object( {
    id: id.required(),
} );


module.exports = { createClienteSchema, updateClienteSchema, getClieteSchema };
