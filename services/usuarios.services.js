const bcrypt = require( 'bcrypt' );
const boom = require( '@hapi/boom' );

const { models } = require( './../libs/sequelize' );

class UsersServices {
    constructor() {

    }

    async crear( data ) {
        const hash = await bcrypt.hash( data.contrasenia, 10 ); // Encriptar la contrasenia
        const resultado = await models.Usuario.create( {
            ...data,
            contrasenia: hash
        } ); // Hace que se sobreescriba el parametro contrasenia y le pasa el hash para que se guarde
        delete resultado.dataValues.contrasenia; // Para no mostrar la contrasenia
        return resultado;
    }

    async find() {
        const resultado = await models.Usuario.findAll( {
            include: [ 'cliente' ]
        } );
        return resultado;
    }

    async findEmail( email ) {
        const usuario = await models.Usuario.findOne( { // Traera el primero que coincida
            where : { email } // Nos traera el email que consida
        } );
        return usuario;
    }

    async findOne( id ) {
        const usuario = await models.Usuario.findByPk( id );
        if( !usuario ) {
            throw boom.notFound( 'Usuario no encontrado' );
        }
        return usuario;
    }

    async actualizar( id, cambios ) {
        const usuario = await this.findOne( id );
        const resultado = await usuario.update( cambios );
        return resultado;
    }

    async eliminar( id ) {
        const usuario = await this.findOne( id );
        await usuario.destroy();
        return { id };
    }
}

module.exports = UsersServices;
