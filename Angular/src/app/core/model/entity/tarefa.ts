import { AbstractEntity } from "./abstract-entity";

export class Tarefa extends AbstractEntity{
    constructor(
        public nome?: String,
        public descricao?: String,
        public dataInicio?: String,
        public dataFim?: String,
        id?: number,
    ){
        super(id)
    }

}