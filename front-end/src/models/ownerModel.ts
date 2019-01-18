export class OwnerModel {
    public ownerId;
    public name;
    public email;
    public ownership_song_percentage;
    public location;
    public ownerType;

    constructor(
        ownerId: string,
        name: string,
        email: string,
        ownership_song_percentage: string,
        location: string,
        ownerType: string) {
        this.ownerId = ownerId;
        this.name=name;
        this.email = email;
        this.ownership_song_percentage = ownership_song_percentage;
        this.location = location;
        this.ownerType = ownerType;
    }
}