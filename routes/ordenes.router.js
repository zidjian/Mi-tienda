const express = require( 'express' );

// ---- Propios ----
const OrdenesServices = require( '../services/ordenes.services' );
const validatorHandler = require( '../middlewares/validator.handler' );
const { createOrdenSchema, getOrdenSchema, agregarElementosSchema } = require( '../schemas/ordenes.schemas' );

const router = express.Router();
const services = new OrdenesServices();

router.get(
    '/',
    async ( req, res ) => {
        const productos = await services.find();
        res.json( productos );
    }
);

router.post(
    '/agregar-elemento',
    validatorHandler( agregarElementosSchema, 'body' ),
    async ( req, res, next ) => {
        try {
            const body = req.body;
            const resultado = await services.agregarElemento( body );
            res.status(201).json( resultado );
        } catch (error) {
            next( error );
        }
    }
);

router.get(
    '/:id',
    validatorHandler( getOrdenSchema, 'params' ),
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
// router.put(
//     '/:id',
//     validatorHandler( getOrdenSchema, 'params' ),
//     validatorHandler( updateClienteSchema, 'body' ),
//     async ( req, res, next ) => {
//         try {
//             const { id } = req.params;
//             const body = req.body;
//             const usuario = await services.actualizar( id, body );
//             res.json( usuario );
//         } catch ( error ) {
//             next( error );
//         }
//     }
// );

// router.patch(
//     '/:id',
//     validatorHandler( getOrdenSchema, 'params' ),
//     validatorHandler( updateClienteSchema, 'body' ),
//     async ( req, res, next ) => {
//         try {
//             const { id } = req.params;
//             const body = req.body;
//             const producto = await services.actualizar( id, body );
//             res.json( producto );
//         } catch ( error ) {
//             next( error );
//         }
//     }
// );

router.delete(
    '/:id',
    validatorHandler( getOrdenSchema, 'params' ),
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

router.post(
    '/',
    validatorHandler( agregarElementosSchema, 'body' ),
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

module.exports = router;
