class UserModel{
    constructor(
        name,
        email,
        pwd,
        organizationType,
        traderId) {
        this.name = name;
        this.email = email;
        this.pwd = pwd;
        this.organizationType = organizationType;
        this.traderId = traderId;
    }
}

module.exports = UserModel;