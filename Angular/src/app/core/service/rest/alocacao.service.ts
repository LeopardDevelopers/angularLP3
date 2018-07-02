import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Alocacao } from '../../model/entity/alocacao';
import { Tarefa } from '../../model/entity/tarefa';
import { Pessoa } from '../../model/entity/pessoa';
import * as URL from './url';

@Injectable({
    providedIn: "root",
})
export class AlocacaoService {

    constructor(private _http: HttpClient) { }

    /** vetor de alocações*/
    pessoaTarefa = new Array<Alocacao>();

    /** vetor aux para preencher o selectPessoa */
    z: Pessoa[];

    /** aux para preencher o selectPessoa */
    respAux: boolean;

    /** tarefa selecionada no select */
    tarefaSelecionada: Tarefa;

    /** grava uma nova alocacao no banco de dados e retorna observable */
    gravaAlocacao(alocacao: Alocacao) {
        console.log(alocacao)
        const url = URL.baseUrl + URL.alocacaoSave_POST;
        return this._http.post<Alocacao>(url, alocacao);
    }

    /** faz um requisição da tarefa e retorna um observable */
    obtemPessoasDaAlocacaoByTarefa(tarefa: Tarefa): Observable<Alocacao[]> {
        const url = URL.baseUrl + URL.alocacaoObtemByTarefaId_GET + tarefa.id;
        return this._http.get<Alocacao[]>(url);
    }

    /** faz um requisição de todas as alocações que tenha a pessoa passada e retorn um observable */
    obtemPessoasDaAlocacaoByPessoa(pessoa: Pessoa): Observable<Alocacao[]> {
        const url = URL.baseUrl + URL.alocacaoObtemByPessoaId_GET + pessoa.id;
        return this._http.get<Alocacao[]>(url);
    }

    /** deleta as alocacao atraves do id e retorna um observable */
    deleteAlocacaoById(id: number) {
        const url = URL.baseUrl + URL.alocacaoDelete_DELETE + id;
        console.log(url)
        return this._http.delete(url);
    }

    /** deleta as alocacao do vetor */
    deleteAlocacaoByVetor(a: Alocacao[]) {

        console.log(a);

        console.log("lenght:" + a.length);

        for (let i = 0; i < a.length; i++) {
            this.deleteAlocacaoById(a[i].id).subscribe(() => {
                console.log("FOI");
            }, () => {
                console.log("Erro no for!");
            });
        }
    }

    /** verifica se a alocação que esta sendo cadastrada já existe */
    alocacaoExiste(x: Alocacao, y: Alocacao[]): boolean {
        for (let i = 0; i < y.length; i++) {
            if (x.tarefa.id == y[i].tarefa.id && x.pessoa.id == y[i].pessoa.id) {
                return true;
            }
        }
        return false;
    }

    /** Busca as pessas ainda não existentes na alocação */
    preencheSelectPessoa(x: Pessoa[], y: Alocacao[]) {
        this.z = new Array<Pessoa>();
        this.respAux = false;
        for (let i = 0; i < x.length; i++) {
            for (let j = 0; j < y.length; j++) {
                if (x[i].id == y[j].pessoa.id) {
                    this.respAux = true;
                }
            }
            if (this.respAux == false) {
                this.z.push(x[i]);
            }
            this.respAux = false;
        }
        return this.z;
    }

}