import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Pessoa } from '../../model/entity/pessoa';
import * as URL from './url';

@Injectable({
    providedIn: "root",
})
export class PessoaService {

    /** Vetor usado para verificar se ja existe uma pessoa no banco de dados */
    pessoa = new Array<Pessoa>();

    constructor(private _http: HttpClient) { }

    /** grava uma nova pessoa no banco de dados e retorna observable */
    gravaPessoa(p: Pessoa): Observable<Pessoa> {
        const url = URL.baseUrl + URL.pessoaSave_POST;
        return this._http.post<Pessoa>(url, p);
    }

    /** faz um requisição de todas as pessoas e retorn um observable */
    obtemTodasAsPessoas(): Observable<Pessoa[]> {
        const url = URL.baseUrl + URL.pessoaObtemTodas_GET;
        return this._http.get<Pessoa[]>(url);
    }


    /** deleta as pessoas atraves do id e retorna um observable */
    deletePessoa(id: number) {
        const url = URL.baseUrl + URL.pessoaDelete_DELETE + id;
        return this._http.delete(url);
    }

    /** utiliza o id para retornar a pessoa existente no vetor */
    procuraPessoa(x: number): Pessoa {
        for (let i = 0; i < this.pessoa.length; i++) {
            if (x == this.pessoa[i].id)
                return this.pessoa[i];
        }
    }

    /** verifica se a pessoa que esta sendo cadastrada já existe */
    pessoaExiste(x: Pessoa, y: Pessoa[]): boolean {
        for (let i = 0; i < y.length; i++) {
            if (x.nome == y[i].nome && x.email == y[i].email) {
                return true;
            }
        }
        return false;
    }
}