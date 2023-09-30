
export class UserDataSchema {
    constructor(res) {
        this.name = res.name
        this.email = res.email
        this.picture = res.picture
        this.profileURL = res.url
    }
}