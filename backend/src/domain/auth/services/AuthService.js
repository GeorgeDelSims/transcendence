// Domain Layer handles the business logic  
// (checking if user exists, hashing password, sending to Repo for database storage)

class AuthService {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async register(username, password) {
        // Check if user exists already
        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('User already exists.');
        }
  
        // hash the password with the bcryptPasswordHasher created in shared/utils/hash.js
        // prevents dependencies on packages, our function calls the package from outside the application layer. 
        const hashedPassword = await this.passwordHasher.hash(password);

        // Create User entity 
        const user = new User({
            username: username,
            password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(user);
        return savedUser;
    }
}

export default AuthService;
