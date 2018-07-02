import { Tarefa } from "./tarefa";
import { Pessoa } from "./pessoa";
import { AbstractEntity } from "./abstract-entity";

export class Alocacao extends AbstractEntity{
    constructor(
        public tarefa?: Tarefa,
        public pessoa?: Pessoa,
        id?: number){
        super(id);
    }
}