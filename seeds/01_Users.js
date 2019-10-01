exports.seed = function seed( knex ) {

    let tableName = 'users';
    let rows = [

        // You are free to add as many rows as you feel like in this array. Make sure that they're an object containing the following fields:
        {
            name: 'Yamit Cardenas',
            username: 'yamitcar',
            password: 'mypassword',
            email: 'yamit.cardenas@gmail.com',
            guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
            created_at: knex.fn.now()
        },

    ];

    return knex( tableName )
    // Empty the table (DELETE)
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });

};