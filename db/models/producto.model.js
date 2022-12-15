const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { categoria_table_name } = require( './categoria.model' );

const producto_table_name = 'productos';

const producto_schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    },
    precio: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.TEXT
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
    },
    categorias_idcategoria: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'categorias_idcategoria',
        references: {
            model: categoria_table_name,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Producto extends Model {
    static associate( models ) { // Estatico no necesito declarar el objeto para acceder a ellos
        this.belongsTo( models.Categoria, { as: 'categoria', foreignKey:'categorias_idcategoria' } );
    }

    static config( sequelize ) {
        return {
            sequelize, // Tipo de conexión
            tableName: producto_table_name, //Nombre de la tabla
            modelName: 'Producto', // Nombr del modelo
            timestamps: false // Si se crearan campos por defecto para la actualizacion y creación
        }
    }
}

module.exports = { producto_table_name, producto_schema, Producto };
