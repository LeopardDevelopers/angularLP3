import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PessoaService } from '../../core/service/rest/pessoas.service';

import { Pessoa } from '../../core/model/entity/pessoa';

@Component({
	selector: 'app-pessoas',
	templateUrl: './pessoas.component.html',
	styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

	/** Formulário vindo do tamplate */
	formulario: FormGroup;

	/** Objeto Pessoa usado para adicinar ao banco de dados */
	pessoa: Pessoa;

	/** Lista de pessoas cadastradas */
	pessoas: Pessoa[];

	/** Variavel usada para exibir a tabela caso exita pessoas */
	respTable: boolean;

	/** índice que representa a pessoa selecionada na tabela para edição */
	index: number;

	constructor(
		private formBuilder: FormBuilder,
		private pessoaService: PessoaService
	) {
		this.atualizaLista();
	}

	ngOnInit() {

		// criação do formulario com suas validações
		this.formulario = this.formBuilder.group({
			nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
			email: [null, [Validators.required, Validators.email]]
		});
	}

	/** Adiciona objeto do banco de dados */
	onSubmit() {

		//verifica individualmente se os campos são valido e altera o css
		this.trataCss();

		//cria um objeto pessoa e insere os valores do formulario nele
		this.pessoa = new Pessoa();
		this.pessoa.id = this.index;
		this.pessoa.nome = this.formulario.get('nome').value;
		this.pessoa.email = this.formulario.get('email').value;

		if (this.formulario.valid) {
			//verifica se a pessoa ja exite
			if (!this.pessoaService.pessoaExiste(this.pessoa, this.pessoas)) {
				//grava a pessoa
				this.pessoaService.gravaPessoa(this.pessoa).subscribe(() => {
					console.log('gravado com sucesso');
					this.atualizaLista();
					this.formulario.reset();
				}, () => {
					console.log('Deu merda!');
				});
				this.index = null;
			}
			//caso a pessoa ja exista ele emite um aviso
			else {
				alert("Está pessoa já está cadastrada!");
				this.formulario.reset();
			}
		}

	}


	/** remove objeto do banco de dados */
	remove(pessoa: Pessoa) {
		this.pessoaService.deletePessoa(pessoa.id).subscribe(() => {
			console.log("Excluido");
			this.atualizaLista();
		});
	}

	/** passa os valores da tabela para o campo de formulario */
	editar(pessoa: Pessoa) {
		this.index = pessoa.id;
		this.formulario.get('nome').setValue(pessoa.nome);
		this.formulario.get('email').setValue(pessoa.email);
	}

	/** faz uma requisição no servidor obtendo todos as pessoas cadastradas */
	atualizaLista() {
		this.pessoaService.obtemTodasAsPessoas().subscribe((lista: Pessoa[]) => {
			this.pessoaService.pessoa = lista;
			this.pessoas = this.pessoaService.pessoa;
			if (this.pessoas.length > 0)
				this.respTable = true;
			else this.respTable = false;
		}, () => {
			alert("Erro!");
		});
	}

	/** 
	 * verifica se o formulário e válido e autera o css do mesmo, criando indicação visual
	 * de que o cadastro não esta correto 
	 */
	trataCss() {
		if (!this.formulario.get('nome').valid) {
			if (!document.getElementById("nome").classList.toggle('is-invalid').valueOf()) {
				document.getElementById("nome").classList.toggle('is-invalid');
			}
			if (!document.getElementById("nomeAviso").classList.toggle('notTranparente').valueOf()) {
				document.getElementById("nomeAviso").classList.toggle('notTranparente');
			}
			console.log("ERROR nome inválido");
		} else {
			document.getElementById("nomeAviso").classList.remove('notTranparente');
			document.getElementById("nomeAviso").classList.remove('tranparente');
			document.getElementById("nomeAviso").classList.toggle('tranparente');
			document.getElementById("nome").classList.remove('is-invalid');
			document.getElementById("nome").classList.toggle('is-valid');
		}
		if (!this.formulario.get('email').valid) {
			if (!document.getElementById("email").classList.toggle('is-invalid').valueOf()) {
				document.getElementById("email").classList.toggle('is-invalid');
			}
			if (!document.getElementById("emailAviso").classList.toggle('notTranparente').valueOf()) {
				document.getElementById("emailAviso").classList.toggle('notTranparente');
			}
			console.log("ERROR email inválido");
		} else {
			document.getElementById("emailAviso").classList.remove('notTranparente');
			document.getElementById("emailAviso").classList.remove('tranparente');
			document.getElementById("emailAviso").classList.toggle('tranparente');
			document.getElementById("email").classList.remove('is-invalid');
			document.getElementById("email").classList.toggle('is-valid');
		}
		if (this.formulario.valid) {
			document.getElementById("nomeAviso").classList.remove('notTranparente');
			if (!document.getElementById("nomeAviso").classList.toggle('tranparente').valueOf()) {
				document.getElementById("nomeAviso").classList.toggle('tranparente');
			}

			document.getElementById("emailAviso").classList.remove('notTranparente');
			if (!document.getElementById("emailAviso").classList.toggle('tranparente').valueOf()) {
				document.getElementById("emailAviso").classList.toggle('tranparente');
			}

			document.getElementById("nome").classList.remove('is-invalid');
			if (!document.getElementById("nome").classList.toggle('is-valid').valueOf()) {
				document.getElementById("nome").classList.toggle('is-valid');
			}

			document.getElementById("email").classList.remove('is-invalid');
			if (!document.getElementById("email").classList.toggle('is-valid').valueOf()) {
				document.getElementById("email").classList.toggle('is-valid');
			}
		}
	}
}
