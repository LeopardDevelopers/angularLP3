import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlocacaoService } from '../../core/service/rest/alocacao.service';
import { TarefasService } from '../../core/service/rest/tarefas.service';
import { PessoaService } from '../../core/service/rest/pessoas.service';

import { Alocacao } from '../../core/model/entity/alocacao';
import { Tarefa } from '../../core/model/entity/tarefa';
import { Pessoa } from '../../core/model/entity/pessoa';

@Component({
  selector: 'app-alocacao',
  templateUrl: './alocacao.component.html',
  styleUrls: ['./alocacao.component.css']
})
export class AlocacaoComponent implements OnInit {

  /** Formulário vindo do tamplate */
  formularioAlocacao: FormGroup;

  tarefas: Tarefa[];
  pessoas: Pessoa[];
  alocacao: Alocacao[];

  /** Objetos usados para adicinar alocacao ao banco de dados */
  pessoaAdd: Pessoa;
  tarefaAdd: Tarefa;
  alocacaoAdd: Alocacao;

  /** armazena pessoas ainda não alocadas na tarefa selecionada */
  pessoaSelect: Pessoa[];

  /** Variavel usada para exibir a tabela caso exita alocacoes */
  respTable: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private alocacaoService: AlocacaoService,
    private tarefaService: TarefasService,
    private pessoaService: PessoaService
  ) {
    this.atualizaLista();
  }


  ngOnInit() {
    // criação do formulario com suas validações
    this.formularioAlocacao = this.formBuilder.group({
      selectTarefa: [null, [Validators.required]],
      selectPessoa: [null, [Validators.required]],
    });
  }

  /** adiciona uma alocação ao banco de dados */
  onSubmit(): void {
    //Preenche a variavel com a pessoa selecionada;
    this.pessoaAdd = this.selectPessoa();

    //Cria a variavel alocação apartir de seus parametros selecionados;
    this.alocacaoAdd = new Alocacao(this.tarefaAdd, this.pessoaAdd);

    //Confere sí a alocacao já existe;
    if (!this.alocacaoService.alocacaoExiste(this.alocacaoAdd, this.alocacao)) {

      //Sí não existe a alocacao e gravada;
      this.alocacaoService.gravaAlocacao(this.alocacaoAdd).subscribe(() => {

        //Depois de gravada obtemos todas as alocacoes da mesma tarefa para mostrar na table;
        this.alocacaoService.obtemPessoasDaAlocacaoByTarefa(this.tarefaAdd).subscribe((list) => {
          this.alocacaoService.pessoaTarefa = list;
          this.alocacao = this.alocacaoService.pessoaTarefa;

          //Função responsavel por chamar a table caso exista alocacao para a tarefa;
          this.chamaTable(this.alocacao);

          //Agora tratamos o selectPessoa para aparecer somente as pessoas não alocadas;
          this.pessoaSelect = this.alocacaoService.preencheSelectPessoa(this.pessoas, this.alocacao);
        });
      })
    } else {
      alert("Essa pessoa já está alocada à essa tarefa!");
    }
    this.resetFormPessoa();
  }

  /** remove uma alocação existente */
  remove(x: Alocacao) {
    //Pegamos o id da alocacao passada como parametro para localiza-la no banco e exclui-la;
    this.alocacaoService.deleteAlocacaoById(x.id).subscribe(() => {

      //Depois de exclui-la obtemos as alocacoes da mesma tarefa para atualizar a table;
      this.alocacaoService.obtemPessoasDaAlocacaoByTarefa(x.tarefa).subscribe((list) => {
        this.alocacaoService.pessoaTarefa = list;
        this.alocacao = this.alocacaoService.pessoaTarefa;

        //Função responsavel por mostrar a table atualizada sí existir alocacoes a serem mostradas;
        this.chamaTable(this.alocacao);

        //Atualiza o selectPessoa pois agora a alocacao retirada permitira a pessoa ser alocada novamente;
        this.pessoaSelect = this.alocacaoService.preencheSelectPessoa(this.pessoas, this.alocacao);
      });
    }, () => {
      //Mensagem para avisar o usuario que ocorreu um erro ao deletar a alocacao;
      console.log("Erro ao deletar alocacao!");
    });
  }

  /** Função chamada quando o valor do selectTarefa foi alterado; */
  selectAlocacao() {

    //Preenche a variavel com o valor presente no selectTarefa;
    let x = this.formularioAlocacao.get('selectTarefa').value;

    //Procura a tarefa do id passado acima e grava na variavel;
    this.tarefaAdd = this.tarefaService.procuraTarefa(x);

    //Depois de selecionar a tarefa procuramos as alocacoes da tarefa;
    this.alocacaoService.obtemPessoasDaAlocacaoByTarefa(this.tarefaAdd).subscribe((list) => {
      this.alocacaoService.pessoaTarefa = list;
      this.alocacao = this.alocacaoService.pessoaTarefa;

      //Chama a table para mostrar as alocacoes da tarefa si existentes;
      this.chamaTable(this.alocacao);

      //Preenche o select com as pessoas disponiveis para alocar;
      this.pessoaSelect = this.alocacaoService.preencheSelectPessoa(this.pessoas, this.alocacao);
    });

  }

  /** Função responsavel por preencher o selectPessoa com as pessoas disponiveis; */
  selectPessoa(): Pessoa {

    //Inicializa a variavel;
    this.pessoaAdd = new Pessoa;

    //Preenche a variavel com o valor do formulario;
    let x = this.formularioAlocacao.get('selectPessoa').value;

    //Procura a pessoa cujo o id e iqual ao passado acima e preenche a variavel;
    this.pessoaAdd = this.pessoaService.procuraPessoa(x);

    return this.pessoaAdd;
  }

  /** Função responsavel de atualizar as listas de tarefas e pessoas; */
  atualizaLista() {

    //Aqui atualiza a lista de tarefas;
    this.tarefaService.obtemTodasTarefas().subscribe((lista) => {
      this.tarefaService.tarefa = lista;
      this.tarefas = this.tarefaService.tarefa;
    }, () => {
      alert("Erro ao carregar lista de Tarefas!");
    });

    //Aqui atualiza a lista de pessoas;
    this.pessoaService.obtemTodasAsPessoas().subscribe((lista) => {
      this.pessoaService.pessoa = lista;
      this.pessoas = this.pessoaService.pessoa;
    }, () => {
      alert("Erro ao carregar lista de Pessoas!");
    });
  }

  /** Função que chama a table para mostrar as alocacoes quando existe alocacao; */
  chamaTable(a: Alocacao[]) {
    if (a.length > 0) {
      this.respTable = true;
    } else {
      this.respTable = false;
    }
  }

  /** Reseta o selectPessoa; */
  resetFormPessoa() {
    this.formularioAlocacao.get('selectPessoa').reset();
  }
}