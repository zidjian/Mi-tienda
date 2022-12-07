const express = require( 'express' );
const cors = require( 'cors' );
const routerApi = require( './routes' );
const app = express();

const { errorHandler, logErrors, boomErrorHandler } = require( './middlewares/error.handler' );

const port = process.env.PORT || 4000;

app.use( express.json() ); // Middelware para recibir el el json que viene de un POST

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    }
}

app.get( '/', ( req, res ) => {
    res.send( 'Mi server en express' );
} );

routerApi( app );
app.use( logErrors );
app.use( boomErrorHandler );
app.use( errorHandler );
app.use( cors( options ) ); // El CORS brinda acceso a cualquiera

app.listen( port, () => {
    console.log( 'Puerto' + port );
} );
