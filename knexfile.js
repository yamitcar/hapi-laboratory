module.exports = {

    development: {
        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'postgres',
        connection: {

            host: 'localhost',

            user: 'postgres',
            password: 'postgres',

            database: 'birdbase',
            charset: 'utf8'

        }

    }

};