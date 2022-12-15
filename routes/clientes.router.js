const express = require( 'express' );

// ---- Propios ----
const ClientesServices = require( '../services/clientes.services' );
const validatorHandler = require( '../middlewares/validator.handler' );
const { createClienteSchema, updateClienteSchema, getClieteSchema } = require( '../schemas/clientes.schemas' );

const router = express.Router();
const services = new ClientesServices();

router.get(
    '/',
    async ( req, res ) => {
        const productos = await services.find();
        res.json( productos );
    }
);

router.get(
    '/:id',
    validatorHandler( getClieteSchema, 'params' ),
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
    validatorHandler( createClienteSchema, 'body' ),
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
    validatorHandler( getClieteSchema, 'params' ),
    validatorHandler( updateClienteSchema, 'body' ),
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
    validatorHandler( getClieteSchema, 'params' ),
    validatorHandler( updateClienteSchema, 'body' ),
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
    validatorHandler( getClieteSchema, 'params' ),
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
