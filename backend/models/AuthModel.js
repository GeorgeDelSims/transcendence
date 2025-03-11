class Auth {
    constructor(fastify) {
      this.db = fastify.db;
    }
  
    getUserByUsername(username) {
      return this.db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    }
  
    createUser(username, hashedPassword) {
      return this.db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);
    }
  }
  
  export default Auth;
  