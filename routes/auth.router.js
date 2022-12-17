const express = require( 'express' );
const passport = require( 'passport' );

const router = express.Router();

router.post(
    '/login',
    passport.authenticate( 'local', { session: false } ), // autenticamos con passport
    async ( req, res, next ) => {
        try {
            res.json( req.user );
        } catch (error) {
            next( error );
        }
    }
);

module.exports = router;
