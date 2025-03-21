class AuthMiddleware {
    constructor(fastify) {
        this.fastify = fastify;
    }

    authenticate = async (request, reply) => {
        try {
            // extract token from request cookies: 
            const {token} = request.cookies; 
            if (!token) { 
                return reply.code(401).send({ message: "Unauthorised: No login token provided."})
            }
            // verify the JWT from the request 
            request.user = this.fastify.jwt.verify(token);

        } catch (err) {
            return reply.code(401).send({ message: "Unauthorised: Invalid token."});
        }
    }
}

export default AuthMiddleware;