
const boom = require( '@hapi/boom' );
const { config } = require( './../config/config' );

function checkApiKey( req, res, next ) {
    const api_key = req.headers[ 'api' ];
    if( api_key === config.apiKey ) {
        next();
    } else {
        next( boom.unauthorized() );
    }
}

module.exports = { checkApiKey };
