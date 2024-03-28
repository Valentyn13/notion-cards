import { randomUUID } from 'node:crypto';

class Card {
  public id: string;

  public name: string;

  public description: string;

  public createdAt: Date;

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.id = randomUUID();
  }

  public setDescription(desc:string):void {
    this.description = desc;
  }

  public setName(name:string):void {
    this.name = name;
  }

  public clone(): Card {
    return new Card(this.name, this.description);
  }
}

export { Card };
