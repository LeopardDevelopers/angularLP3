import { AbstractEntity } from './abstract-entity';

export class Pessoa extends AbstractEntity {
  constructor(public nome?: string, 
              public email?: string, 
              id?: number) {
    super(id);
  }
}