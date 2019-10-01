import Knex from "../knex";

exports.find = (username) => {
    return Knex( 'users' ).where( {
        // Equiv. to `username: username`
        username,
    } ).select( 'guid', 'password' ).then( ( [user] ) => {
        if( !user ) {
            return {
                error: true,
                errMessage: 'the specified user was not found'
            };
        }else {
            return {
                error:false,
                username,
                password: user.password,
                guid: user.guid
            };
        }
    } ).catch( ( err ) => {
        return {
            error: true,
            errMessage: 'some problem happened with the query'
        };
    } );
}