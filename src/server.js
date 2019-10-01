'use strict';

import Hapi from '@hapi/hapi';
import HapiAuthJwt from 'hapi-auth-jwt2';
import BirdController from './controllers/birds'
import AuthorizationController from './controllers/authorization'

const init = async () => {
    const server = new Hapi.Server({ port: 8000 });
    await server.register(HapiAuthJwt);

    server.auth.strategy('jwt', 'jwt',
        {
            key: AuthorizationController.secret,          // Never Share your secret key
            validate: AuthorizationController.validate,            // validate function defined above
            verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
        });
    server.auth.default('jwt');

    server.route([
        {
            path: '/auth',
            method: 'POST',
            options: { auth: false },
            handler: AuthorizationController.authorize
        },
        {
            method: "GET",
            path: "/restricted",
            options: { auth: "jwt" },
            handler: (request, h) => {
                let response = h.response({ text: "You used a Token!" });
                response.header("Authorization", request.headers.authorization);
                return response;
            }
        },
        {
            method: 'GET',
            path: '/birds',
            options: { auth: false },
            handler: BirdController.find
        }
    ]);
    await server.start();
    return server;
};


init().then(server => {
    console.log('Server running at:', server.info.uri);
})
    .catch(error => {
        console.log(error);
    });
