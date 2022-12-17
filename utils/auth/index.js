const passport = require( 'passport' );

const local_strategy = require( './strategies/local.strategy' );

passport.use( local_strategy );
