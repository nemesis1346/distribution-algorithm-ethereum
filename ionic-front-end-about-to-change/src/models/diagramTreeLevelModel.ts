export class DiagramTreeLevelModel {
    public name;
    public children;
    public value;
    constructor(
        name: string,
        children: string,
        value: string
    ) {
        this.name = name;
        this.children = children;
        this.value = value;
    }
}