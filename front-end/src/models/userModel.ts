export class UserModel {
    public email;
    public pwd;
    public name;
    public organizationType;
    public traderId;
    constructor(
        name: string,
        email: string,
        pwd: string,
        organizationType: string,
        traderId: string) {
        this.name = name
        this.email = email;
        this.pwd = pwd;
        this.organizationType = organizationType;
        this.traderId = traderId;
    }
}