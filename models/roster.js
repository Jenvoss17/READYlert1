class Roster {
    constructor() {
        this.table = 'rosters'
        this.allFields = ['id', 'title', 'created_by']
        this.requiredFields = ['title', 'created_by']
    }
}

module.exports = Roster;