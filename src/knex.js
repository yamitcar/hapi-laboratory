import Knex from 'knex';

export default Knex( {

    client: 'postgres',
    connection: {

        host: 'localhost',

        user: 'postgres',
        password: 'postgres',

        database: 'birdbase',
        charset: 'utf8'

    }

} );