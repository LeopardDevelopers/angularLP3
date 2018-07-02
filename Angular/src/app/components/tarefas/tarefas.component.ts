import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TarefasService } from '../../core/service/rest/tarefas.service';

import { Tarefa } from '../../core/model/entity/tarefa';

@Component({
	selector: 'app-tarefas',
	templateUrl: './tarefas.component.html',
	styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

	/** Formulário vindo do tamplate */
	formularioTarefas: FormGroup;

	/** Objeto Tarefa usado para adicinar ao banco de dados */
	tarefa: Tarefa;

	/** Lista de tarefas cadastradas */
	tarefas: Tarefa[];

	/** Variavel usada para exibir a tabela caso exita tarefas */
	respTable: boolean;

	/** datas da tarefas selecionada para edicao */
	dataInicio: Date;
	dataFim: Date;

	/** índice que representa a tarefas selecionada na tabela para edição */
	idEdit: number;

	constructor(
		private formBuilder: FormBuilder,
		private tarefasService: TarefasService
	) {
		this.atualizaLista();
	}

	ngOnInit() {

		// criação do formulario com suas validações
		this.formularioTarefas = this.formBuilder.group({
			nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
			descricao: [null, [Validators.required]],
			dataInicio: [null, [Validators.required]],
			dataFim: [null, [Validators.required]]
		});
	}

	/** grava uma nova tarefa */
	onSubmit() {
		//verifica individualmente se os campos são valido e altera o css
		this.trataCss();
		//verifica se as datas são validas
		if (this.datasErradas()) {
		} else {
			if (this.formularioTarefas.valid) {

				//cria um objeto formulario e insere os valores do formulario nele
				this.tarefa = new Tarefa();
				this.tarefa.id = this.idEdit;
				this.tarefa.nome = this.formularioTarefas.get('nome').value;
				this.tarefa.descricao = this.formularioTarefas.get('descricao').value;
				this.tarefa.dataInicio = this.formularioTarefas.get('dataInicio').value;
				this.tarefa.dataFim = this.formularioTarefas.get('dataFim').value;

				//verifica se a tarefa ja exite
				if (!this.tarefasService.tarefaExiste(this.tarefa, this.tarefas)) {
					//grava a tarefa
					this.tarefasService.gravaTarefa(this.tarefa).subscribe(() => {
						console.log('gravado com sucesso');
						console.log(this.tarefa);
						this.atualizaLista();
						this.formularioTarefas.reset();
					}, () => {
						console.log('Deu merda!');
					});
					this.idEdit = null;
				}
				//caso a tarefa ja exista ele emite um aviso
				else {
					alert("Está pessoa já está cadastrada!");
					this.formularioTarefas.reset();
				}
			}
		}
	}


	/** remove a tarefa */
	remove(tarefa: Tarefa) {
		this.tarefasService.deleteTarefa(tarefa.id).subscribe(() => {
			console.log('excluido');
			this.atualizaLista();
		}, () => {
			console.log('Deu merda!');
		});
	}

	/** edita a tarefa */
	edita(tarefa: Tarefa) {
		this.idEdit = tarefa.id;
		this.formularioTarefas.get('nome').setValue(tarefa.nome);
		this.formularioTarefas.get('descricao').setValue(tarefa.descricao);
		this.formularioTarefas.get('dataInicio').setValue(tarefa.dataInicio);
		this.formularioTarefas.get('dataFim').setValue(tarefa.dataFim);
	}

	/** Valida as datas escolhidas no formulario */
	datasErradas(): boolean {
		this.dataInicio = new Date(this.formularioTarefas.get('dataInicio').value);
		this.dataFim = new Date(this.formularioTarefas.get('dataFim').value);
		const dataAtual = new Date();
		if (this.dataFim.getDate() <= this.dataInicio.getDate() && this.dataFim.getMonth() <= this.dataInicio.getMonth()) {
			alert("Erro na data final!");
			return true;
		} else if (this.dataInicio.getUTCDay() < dataAtual.getUTCDay()) {
			alert("Erro na data inicial!");
			return true;
		} else return false
	}

	/** faz uma requisição no servidor obtendo todos as tarefas cadastradas */
	atualizaLista() {
		this.tarefasService.obtemTodasTarefas().subscribe((tarefa: Tarefa[]) => {
			this.tarefas = tarefa;
			if (this.tarefas.length > 0)
				this.respTable = true;
			else this.respTable = false;
		}, () => {
			alert("Error");
		});
	}

	/** 	
	 * verifica se o formulário e válido e autera o css do mesmo, criando indicação visual
	 * de que o cadastro não esta correto
	 */
	trataCss() {
		if (!this.formularioTarefas.get('nome').valid) {
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
		if (!this.formularioTarefas.get('descricao').valid) {
			if (!document.getElementById("descricao").classList.toggle('is-invalid').valueOf()) {
				document.getElementById("descricao").classList.toggle('is-invalid');
			}
			if (!document.getElementById("descricaoAviso").classList.toggle('notTranparente').valueOf()) {
				document.getElementById("descricaoAviso").classList.toggle('notTranparente');
			}
			console.log("ERROR descricao inválido");
		} else {
			document.getElementById("descricaoAviso").classList.remove('notTranparente');
			document.getElementById("descricaoAviso").classList.remove('tranparente');
			document.getElementById("descricaoAviso").classList.toggle('tranparente');
			document.getElementById("descricao").classList.remove('is-invalid');
			document.getElementById("descricao").classList.toggle('is-valid');
		}

		if (!this.formularioTarefas.get('dataInicio').valid) {
			if (!document.getElementById("dataA").classList.toggle('is-invalid').valueOf()) {
				document.getElementById("dataA").classList.toggle('is-invalid');
			}
			if (!document.getElementById("dataAAviso").classList.toggle('notTranparente').valueOf()) {
				document.getElementById("dataAAviso").classList.toggle('notTranparente');
			}
			console.log("ERROR dataA inválido");
		} else {
			document.getElementById("dataAAviso").classList.remove('notTranparente');
			document.getElementById("dataAAviso").classList.remove('tranparente');
			document.getElementById("dataAAviso").classList.toggle('tranparente');
			document.getElementById("dataA").classList.remove('is-invalid');
			document.getElementById("dataA").classList.toggle('is-valid');
		}

		if (!this.formularioTarefas.get('dataFim').valid) {
			if (!document.getElementById("dataB").classList.toggle('is-invalid').valueOf()) {
				document.getElementById("dataB").classList.toggle('is-invalid');
			}
			if (!document.getElementById("dataBAviso").classList.toggle('notTranparente').valueOf()) {
				document.getElementById("dataBAviso").classList.toggle('notTranparente');
			}
			console.log("ERROR dataB inválido");
		} else {
			document.getElementById("dataBAviso").classList.remove('notTranparente');
			document.getElementById("dataBAviso").classList.remove('tranparente');
			document.getElementById("dataBAviso").classList.toggle('tranparente');
			document.getElementById("dataB").classList.remove('is-invalid');
			document.getElementById("dataB").classList.toggle('is-valid');
		}
	}
}
