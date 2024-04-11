import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken')

export async function GuardianMiddleware(request: Request, response: Response, next: NextFunction) {
    const auth = request.headers.authorization
    if (!auth) {
        return response.status(401).json('No Auth Found')
    }

    const [authType, authValue] = auth.split(' ')

    if (authType !== 'Bearer' || !authValue) {
        return response.status(401).json('Invalid Auth Type or No Auth Value')
    }

    if (!authValue) {
        return response.status(401).json('Invalid Credential')
    }

    jwt.verify(authValue, process.env.SECRET_JWT, async (err: Error, decoded: any) => {
        if (err) {
            return response.status(401).end('Invalid Token');
        } else {
            console.log(decoded.token, String(decoded.type) == 'admin', ' ========================= ')

            if (String(decoded.token) == 'acetoken' && (String(decoded.type) == 'admin' || String(decoded.type) == 'moderator')) {
                return next()
            }
            return response.status(401).end('No Privileges');
        }
    })
}