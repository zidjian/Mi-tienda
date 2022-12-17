const { Strategy } = require( 'passport-local' );
const boom = require( '@hapi/boom' );
const bcrypt = require( 'bcrypt' );

const UsuarioServicio = require( './../../../services/usuarios.services' );
const servicio = new UsuarioServicio();

const local_strategy = new Strategy( {
    usernameField: 'email',
    passwordField: 'password'
    } // Para modificar los parametros de username y password a otros como email y password
    ,async ( email, contrasenia, done ) => {
        try {
            const usuario = await servicio.findEmail( email ); // Busca el usuario
            if( !usuario ) { // Pregunta su lo encontro
                done( boom.unauthorized(), false ); // Envia un error tipo boom desautorizando
            }
            const coincide = await bcrypt.compare( contrasenia, usuario.contrasenia ); // Compara la contraseña con el has de la base de datos
            if( !coincide ) { // Pregunta si las credenciales son correctas
                done( boom.unauthorized(), false ); // Envia un error tipo boom desautorizando
            }
            delete usuario.dataValues.contrasenia; // Quitamos la contraseña para que no se le muestre al usuario
            done( null, usuario );
        } catch (error) {
            done( error, false );
        }
    }
);

module.exports = local_strategy;
