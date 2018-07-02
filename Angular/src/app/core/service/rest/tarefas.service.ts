import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Tarefa } from '../../model/entity/tarefa';
import * as URL from './url';

@Injectable({
    providedIn: "root",
})
export class TarefasService {

    /** vetor de tarefas */
    tarefa = new Array<Tarefa>();
    
    constructor(private _http: HttpClient) { }
    
    /** grava uma nova tarefa no banco de dados e retorna observable */
    gravaTarefa(t: Tarefa): Observable<Tarefa> {
        const url = URL.baseUrl + URL.tarefaSave_POST;
        return this._http.post<Tarefa>(url, t);
    }

    /** faz um requisição de todas as tarefas e retorn um observable */
    obtemTodasTarefas(): Observable<Tarefa[]> {
        const url = URL.baseUrl + URL.tarefaObtemTodas_GET;
        return this._http.get<Tarefa[]>(url);
    }

    /** deleta as tarefas atraves do id e retorna um observable */
    deleteTarefa(id) {
        const url = URL.baseUrl + URL.tarefaDelete_DELETE + id;
        return this._http.delete<Tarefa>(url);
    }

    /** verifica se a tarefa que esta sendo cadastrada já existe */
    tarefaExiste(x: Tarefa, y: Tarefa[]): boolean {
        for (let i = 0; i < y.length; i++) {
            if (x.nome == y[i].nome &&
                x.dataInicio == y[i].dataInicio &&
                x.dataFim == y[i].dataFim &&
                x.descricao == y[i].descricao) {
                return true;
            }
        }
        return false;
    }

    /** utiliza o id para retornar a tarefa existente no vetor */
    procuraTarefa(x: number): Tarefa {
        for (let i = 0; i < this.tarefa.length; i++) {
            if (x == this.tarefa[i].id)
                return this.tarefa[i];
        }
    }

}