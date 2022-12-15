const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const usuario_table_name = 'usuarios';

const usuario_schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    contrasenia: {
        allowNull: false,
        type: DataTypes.STRING
    },
    rol: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    creadoEn: {
        allowNull: false,
        type: DataTypes.DATE,
        File: 'creado_en',
        defaultValue: Sequelize.NOW
    }
};

class Usuario extends Model {
    static associate( models ) { // Estatico no necesito declarar el objeto para acceder a ellos
        this.hasOne( models.Cliente, { as: 'cliente', foreignKey:'usuarios_idusuario' })
    }

    static config( sequelize ) {
        return {
            sequelize, // Tipo de conexión
            tableName: usuario_table_name, //Nombre de la tabla
            modelName: 'Usuario', // Nombr del modelo
            timestamps: false // Si se crearan campos por defecto para la actualizacion y creación
        }
    }
}

module.exports = { usuario_table_name, usuario_schema, Usuario };
