const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { usuario_table_name } = require( './user.model' );

const cliente_table_name = 'clientes';

const cliente_schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombres: {
        allowNull: false,
        type: DataTypes.STRING
    },
    apellidos: {
        allowNull: false,
        type: DataTypes.STRING
    },
    celular: {
        allowNull: false,
        type: DataTypes.STRING
    },
    creadoEn: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'creado_en',
        defaultValue: Sequelize.NOW
    },
    usuarios_idusuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'usuarios_idusuario',
        references: {
            model: usuario_table_name,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Cliente extends Model {
    static associate( models ) { // Estatico no necesito declarar el objeto para acceder a ellos
        this.belongsTo( models.Usuario, { as: 'usuario', foreignKey:'usuarios_idusuario' } ); // importante para anidar
        this.hasMany( models.Orden, { as: 'orden', foreignKey:'clientes_idcliente' } ); // importante para anidar
    }

    static config( sequelize ) {
        return {
            sequelize, // Tipo de conexión
            tableName: cliente_table_name, //Nombre de la tabla
            modelName: 'Cliente', // Nombre del modelo
            timestamps: false // Si se crearan campos por defecto para la actualizacion y creación
        }
    }
}

module.exports = { cliente_table_name, cliente_schema, Cliente };
