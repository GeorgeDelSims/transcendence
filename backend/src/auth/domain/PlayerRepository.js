// Domain Layer Abstract class for accessing the Infrastructure layer to get to the Database

class PlayerRepository {

    getByUsername(username) {
        throw new Error("Method 'getByUsername()' not implemented")
    }

    save(player) {
        throw new Error("Method 'save()' not implemented")
    }
}

export default PlayerRepository;
