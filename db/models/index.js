const { Usuario, usuario_schema} = require( './user.model' );
const { Cliente, cliente_schema} = require( './cliente.model' );
const { Producto, producto_schema} = require( './producto.model' );
const { Categoria, categoria_schema} = require( './categoria.model' );
const { Orden, orden_schema} = require( './orden.model' );
const { OrdenProducto, orden_producto_schema} = require( './orden_producto.model' );

function setupModels( sequelize ) {
    Usuario.init( usuario_schema, Usuario.config( sequelize ) ); // Lo inicializamos
    Cliente.init( cliente_schema, Cliente.config( sequelize ) ); // Lo inicializamos
    Producto.init( producto_schema, Producto.config( sequelize ) ); // Lo inicializamos
    Categoria.init( categoria_schema, Categoria.config( sequelize ) ); // Lo inicializamos
    Orden.init( orden_schema, Orden.config( sequelize ) ); // Lo inicializamos
    OrdenProducto.init( orden_producto_schema, OrdenProducto.config( sequelize ) ); // Lo inicializamos

    Usuario.associate( sequelize.models );
    Cliente.associate( sequelize.models );
    Producto.associate( sequelize.models );
    Categoria.associate( sequelize.models );
    Orden.associate( sequelize.models );
}

module.exports = setupModels;
