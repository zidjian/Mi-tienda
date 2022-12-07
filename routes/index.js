const express = require( 'express' );

const producsRouter = require( './products.router' );
const usersRouter = require( './users.router' );
const categoriesRouter = require( './categories.router' );

function routerApi( app ) {
    const router = express.Router();
    app.use( '/api/v1', router );
    router.use( '/productos', producsRouter );
    router.use( '/usuarios', usersRouter );
    router.use( '/categorias', categoriesRouter );
}

module.exports = routerApi;
