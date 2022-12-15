const express = require( 'express' );

// ---- Propios ----
const ProductosServices = require( './../services/productos.services' );
const validatorHandler = require( './../middlewares/validator.handler' );
const { createProductoSchema, updateProductoSchema, getProductoSchema, paginacionProductosSchema } = require( './../schemas/productos.schemas' );

const router = express.Router();
const services = new ProductosServices();

router.get(
    '/',
    validatorHandler( paginacionProductosSchema, 'query' ),
    async ( req, res, next ) => {
        try {
            const productos = await services.find( req.query );
            res.json( productos );
        } catch ( error ) {
            next( error )
        }
    }
);

router.get( '/filtro', ( req, res ) => {
    res.send( 'Estático' );
} );

router.get(
    '/:id',
    validatorHandler( getProductoSchema, 'params' ),
    async ( req, res, next ) => {
        try {
            const { id } = req.params;
            const producto = await services.findOne( id );
            res.json( producto );
        } catch (error) {
            next( error );
        }
    }
);

router.post(
    '/',
    validatorHandler( createProductoSchema, 'body' ),
    async ( req, res, next ) => {
        const body = req.body;
        const nuevo_producto = await services.crear( body );
        res.json( nuevo_producto );
    }
);

router.put(
    '/:id',
    validatorHandler( getProductoSchema, 'params' ),
    validatorHandler( updateProductoSchema, 'body' ),
    async ( req, res ) => {
        const { id } = req.params;
        const body = req.body;
        const producto = await services.actualizar( id, body );
        res.json( producto );
    }
);

router.patch(
    '/:id',
    validatorHandler( getProductoSchema, 'params' ),
    validatorHandler( updateProductoSchema, 'body' ),
    async ( req, res, next ) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const producto = await services.actualizar( id, body );
            res.json( producto );
        } catch ( error ) {
            res.status(404).json( {
                message: error.message
            } );
        }
    }
);

router.delete( '/:id', async ( req, res ) => {
    const { id } = req.params;
    const producto = await services.eliminar( id );
    res.json( producto );
} );

module.exports = router;
