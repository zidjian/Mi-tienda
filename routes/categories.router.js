const express = require( 'express' );
const faker = require( 'faker' );

const CategoriesServices = require( './../services/categories.services' );
const validatorHandler = require( './../middlewares/validator.handler' );
const { createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema } = require( './../schemas/category.schemas' );

const router = express.Router();
const services = new CategoriesServices();

router.get(
    '/',
    async ( req, res ) => {
        const categorias = await services.find();
        res.json( categorias );
    }
);

router.get(
    '/:id_categoria',
    validatorHandler( getCategoriaSchema, 'params' ),
    async ( req, res, next ) => {
        try {
            const { id_categoria } = req.params;
            const categoria = await services.findOne( id_categoria );
            res.json( categoria );
        } catch (error) {
            next( error );
        }
    }
);

module.exports = router;
