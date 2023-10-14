
export class UserDataSchema {
    constructor(res) {
        this.name = res.name
        this.bio = res.bio
        this.email = res.email
        this.picture = res.picture
        this.profileURL = res.url
    }
}

export class ReadingLogInfoSchema {
    constructor({name, date, words}) {
        this.name = name
        this.date = date
        this.words = words
    }
}