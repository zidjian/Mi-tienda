const express = require( 'express' );

// ---- Propios ----
const ProductsServices = require( './../services/products.services' );
const validatorHandler = require( './../middlewares/validator.handler' );
const { createProductSchema, updateProductSchema, getProductSchema } = require( './../schemas/product.schemas' );

const router = express.Router();
const services = new ProductsServices();

router.get(
    '/',
    async ( req, res ) => {
        const productos = await services.find();
        res.json( productos );
    }
);

router.get( '/filtro', ( req, res ) => {
    res.send( 'Estático' );
} );

router.get(
    '/:id',
    validatorHandler( getProductSchema, 'params' ),
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
    validatorHandler( createProductSchema, 'body' ),
    async ( req, res, next ) => {
        const body = req.body;
        const nuevo_producto = await services.crear( body );
        res.json( nuevo_producto );
    }
);

router.put(
    '/:id',
    validatorHandler( getProductSchema, 'params' ),
    validatorHandler( updateProductSchema, 'body' ),
    async ( req, res ) => {
        const { id } = req.params;
        const body = req.body;
        const producto = await services.actualizar( id, body );
        res.json( producto );
    }
);

router.patch(
    '/:id',
    validatorHandler( getProductSchema, 'params' ),
    validatorHandler( updateProductSchema, 'body' ),
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
