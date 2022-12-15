const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { orden_table_name } = require( './orden.model' );
const { producto_table_name } = require( './producto.model' );

const orden_producto_table_name = 'orden_producto';

const orden_producto_schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    cantidad: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    creadoEn: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'creado_en',
        defaultValue: Sequelize.NOW
    },
    ordenes_idorden: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'ordenes_idorden',
        references: {
            model: orden_table_name,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productos_idproducto: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'productos_idproducto',
        references: {
            model: producto_table_name,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class OrdenProducto extends Model {
    static associate( models ) { // Estatico no necesito declarar el objeto para acceder a ellos

    }

    static config( sequelize ) {
        return {
            sequelize, // Tipo de conexión
            tableName: orden_producto_table_name, //Nombre de la tabla
            modelName: 'OrdenProducto', // Nombre del modelo
            timestamps: false // Si se crearan campos por defecto para la actualizacion y creación
        }
    }
}

module.exports = { orden_producto_table_name, orden_producto_schema, OrdenProducto };
