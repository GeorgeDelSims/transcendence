// infrastructure Layer: The controller uses the classes from the Application Layer

class AuthController {
  constructor({ registerUser, loginUser }) {
      this.registerUser = registerUser;
      this.loginUser = loginUser;

      this.register = this.register.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
  }

  async register(request, reply) {
      try {
          const { username, password } = request.body;
          await this.registerUser.execute(username, password);
          reply.send({ message: "Registered successfully" });
      } catch (err) {
          reply.code(400).send({ message: err.message });
      }
  }

  async login(request, reply) {
      try {
          const { username, password } = request.body;
          const token = await this.loginUser.execute(username, password);
          reply.setCookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "Strict",
              path: "/"
          }).send({ message: "Login successful" });
      } catch (err) {
          reply.code(400).send({ message: err.message });
      }
  }

  logout(request, reply) {
      reply.clearCookie("token", { path: "/" }).send({ message: "Logged out" });
  }
}

export default AuthController;


/*
import Auth from '../../../../../models/AuthModel.js';

class AuthController {
  constructor(fastify) {
    this.fastify = fastify;
    this.authModel = new Auth(fastify);
    // Bind methods
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  

  async register(request, reply) {
    const { username, password } = request.body;
    if (this.authModel.getUserByUsername(username)) {
      return reply.code(400).send({ message: "User already exists" });
    }
    // Hash password and save user
    const hashedPassword = await this.fastify.bcrypt.hash(password);
    this.authModel.createUser(username, hashedPassword);
    reply.send({ message: "User registered successfully" });
  }
  
  
  async login(request, reply) {
    // extract username and password from the request object (body)
    const { username, password } = request.body;
    const user = this.authModel.getUserByUsername(username);
    if (!user) {
      return reply.code(400).send({ message: "User doesn't exist" });setNotFoundHandler
    }
    const isPasswordValid = await this.fastify.bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.code(400).send({ message: "Wrong password" });
    }
    // Generate JSon Web Token which will be stored in a Cookie.
    // This means that logged in users will always have a token which will allow them to access
    // parts of the website that non-registered users cannot (areas protected by middleware). 
    const token = this.fastify.jwt.sign({ id: user.id, username: user.username });
    reply.setCookie("token", token, {
      httpOnly: true, // prevents XSS attacks (no Javascript can access the token)
      secure: true, // only HTTPS
      sameSite: "Strict", // prevents Cross Site Request Forgery (csrf)
      path: "/"
    }).send({ message: "Login successful" });
  }
  
  
  logout(request, reply) {
    reply.clearCookie("token", { path: "/" }).send({ message: "Logged out successfully" });
  }
}

export default AuthController;

*/