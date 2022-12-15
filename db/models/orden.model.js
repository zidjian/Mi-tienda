const { Model, DataTypes, Sequelize } = require( 'sequelize' );

const { cliente_table_name } = require( './cliente.model' );

const orden_table_name = 'ordenes';

const orden_schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    creadoEn: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'creado_en',
        defaultValue: Sequelize.NOW
    },
    clientes_idcliente: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'clientes_idcliente',
        references: {
            model: cliente_table_name,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Orden extends Model {
    static associate( models ) { // Estatico no necesito declarar el objeto para acceder a ellos
        this.belongsTo( models.Cliente, {
            as: 'cliente',
            foreignKey:'clientes_idcliente'
        } ); // importante para anidar
        this.belongsToMany( models.Producto, {
            as: 'elemento',
            through: models.OrdenProducto,
            foreignKey: 'ordenes_idorden',
            otherKey: 'productos_idproducto'
        } );
    }

    static config( sequelize ) {
        return {
            sequelize, // Tipo de conexión
            tableName: orden_table_name, //Nombre de la tabla
            modelName: 'Orden', // Nombre del modelo
            timestamps: false // Si se crearan campos por defecto para la actualizacion y creación
        }
    }
}

module.exports = { orden_table_name, orden_schema, Orden };
