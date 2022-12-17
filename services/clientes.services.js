const bcrypt = require( 'bcrypt' );
const boom = require( '@hapi/boom' );

const { models } = require( './../libs/sequelize' );

class ClientesServices {
    constructor() {

    }

    async crear( data ) {
        const hash = await bcrypt.hash( data.usuario.contrasenia, 10 ); // Convirtiendo la contraseña en un hash
        const registro_modificado  = {
            ...data, // El conteido que se sobreescribirá
            usuario: { // Ingreso al apartado de usuario que se modificará
                ...data.usuario, // El conteido que se sobreescribira
                contrasenia: hash // Indico que lo que modificara sera la contraseña
            }
        };
        const resultado = await models.Cliente.create( registro_modificado, {
            include: [ 'usuario' ]
        } );
        delete resultado.usuario.dataValues.contrasenia;
        return resultado;
    }

    async find() {
        const resultado = await models.Cliente.findAll( {
            include: [ 'usuario' ]
        } );
        return resultado;
    }

    async findOne( id ) {
        const resultado = await models.Cliente.findByPk( id );
        if( !resultado ) {
            throw boom.notFound( 'Cliente no encontrado' );
        }
        return resultado;
    }

    async actualizar( id, cambios ) {
        const registro = await this.findOne( id );
        const resultado = await registro.update( cambios );
        return resultado;
    }

    async eliminar( id ) {
        const registro = await this.findOne( id );
        await registro.destroy();
        return { id };
    }
}

module.exports = ClientesServices;
