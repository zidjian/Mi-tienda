const express = require( 'express' );

const CategoriasServices = require( './../services/categorias.services' );
const validatorHandler = require( './../middlewares/validator.handler' );
const { createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema } = require( './../schemas/categorias.schemas' );

const router = express.Router();
const services = new CategoriasServices();

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
    validatorHandler( getCategoriaSchema, 'params' ),
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
    validatorHandler( createCategoriaSchema, 'body' ),
    async ( req, res, next ) => {
        try {
            const body = req.body;
            const nuevo_usuario = await services.crear( body );
            res.json( nuevo_usuario );
        } catch (error) {
            next( error );
        }
    }
);

router.put(
    '/:id',
    validatorHandler( getCategoriaSchema, 'params' ),
    validatorHandler( updateCategoriaSchema, 'body' ),
    async ( req, res, next ) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const usuario = await services.actualizar( id, body );
            res.json( usuario );
        } catch ( error ) {
            next( error );
        }
    }
);

router.patch(
    '/:id',
    validatorHandler( getCategoriaSchema, 'params' ),
    validatorHandler( updateCategoriaSchema, 'body' ),
    async ( req, res, next ) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const producto = await services.actualizar( id, body );
            res.json( producto );
        } catch ( error ) {
            next( error );
        }
    }
);

router.delete(
    '/:id',
    validatorHandler( getCategoriaSchema, 'params' ),
    async ( req, res, next ) => {
        try {
            const { id } = req.params;
            const producto = await services.eliminar( id );
            res.json( producto );
        } catch ( error ) {
            next( error );
        }
    }
);

module.exports = router;
