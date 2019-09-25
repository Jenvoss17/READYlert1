class Profile {
    constructor() {
        this.table = 'profiles'
        this.allFields = ['id', 'name', 'description', 'phone', 'address', 'picture']
        this.requiredFields = ['name', 'description', 'phone', 'address', 'picture']
    }
}

module.exports = Profile;