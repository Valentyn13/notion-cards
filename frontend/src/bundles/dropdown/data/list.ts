import { randomUUID } from 'node:crypto';

import  { type Card } from './card';

class List {
  public id: string;

  public name: string;

  public cards: Card[] = [];

  public constructor(name: string) {
    this.name = name;
    this.id = randomUUID();
  }

  public setName(name:string): this {
    this.name = name;
    return this;
  }

  public setCards(cards: Card[]): this {
    this.cards = cards;

    return this;
  }
}

export { List };
