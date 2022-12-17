const express = require( 'express' );

const usersRouter = require( './users.router' );
const clientesRouter = require( './clientes.router' );
const categoriasRouter = require( './categorias.router' );
const productosRouter = require( './productos.router' );
const ordenesRouter = require( './ordenes.router' );
const authRouter = require( './auth.router' );

function routerApi( app ) {
    const router = express.Router();
    app.use( '/api/v1', router );
    router.use( '/usuarios', usersRouter );
    router.use( '/clientes', clientesRouter );
    router.use( '/categorias', categoriasRouter );
    router.use( '/productos', productosRouter );
    router.use( '/ordenes', ordenesRouter );
    router.use( '/auth', authRouter );
}

module.exports = routerApi;
