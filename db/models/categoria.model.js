const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const categoria_table_name = 'categorias';

const categoria_schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    imagen: {
        allowNull: false,
        type: DataTypes.STRING
    },
    creadoEn: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'creado_en',
        defaultValue: Sequelize.NOW
    }
};

class Categoria extends Model {
    static associate( models ) { // Estatico no necesito declarar el objeto para acceder a ellos
        this.hasMany( models.Producto, { as: 'producto', foreignKey:'categorias_idcategoria' } );
    }

    static config( sequelize ) {
        return {
            sequelize, // Tipo de conexión
            tableName: categoria_table_name, //Nombre de la tabla
            modelName: 'Categoria', // Nombre del modelo
            timestamps: false // Si se crearan campos por defecto para la actualizacion y creación
        }
    }
}

module.exports = { categoria_table_name, categoria_schema, Categoria };
