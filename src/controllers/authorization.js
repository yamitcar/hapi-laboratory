'use strict';

import JWT  from "jsonwebtoken";
import UserRepository from "../repositories/userRepository";

const secret = 'NeverShareYourSecret';

export default class AuthorizationController {

    static get secret() {
        return secret;
    }

    static async validate(decoded, request, h) {
        let user = await UserRepository.find(decoded.username);
        if (user.error) {
            return { isValid: false };
        } else {
            return { isValid: true };
        }
    }

    static async authorize(request,h) {
        // This is a ES6 standard
        //TODO validate if the payload is present.
        const { username, password } = request.payload;
        let user = await UserRepository.find(username);
        if( !user ) {
            return {
                error: true,
                errMessage: 'the specified user was not found'
            };
        }else {
            //TODO check this...
            if( user.password === password ) {
                const token = JWT.sign({
                    username,
                    scope: user.guid,
                }, secret, {
                    algorithm: 'HS256',
                    expiresIn: '12h',
                } );

                let response = h.response({
                    text: "Access with your token /restricted",
                    token: token,
                    scope: user.guid
                });
                response.header("Authorization", token);
                return response;
            } else {
                return {
                    error: true,
                    errMessage: 'the specified user/password was not found'
                }
            }
        }
    }
}