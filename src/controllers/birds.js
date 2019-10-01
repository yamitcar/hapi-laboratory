import Knex from "../knex";

exports.find = (request,h) => {
    // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
    return Knex( 'birds' ).where( {
        isPublic: true
    } ).select( 'name', 'species', 'picture_url' )
        .then( ( results ) => {
            if( !results || results.length === 0 ) {
                return {
                    error: true,
                    errMessage: 'no public bird found',
                };
            }
            return {
                dataCount: results.length,
                data: results,
            };

        } ).catch( ( err ) => {
            return 'server-side error';
        } );
}