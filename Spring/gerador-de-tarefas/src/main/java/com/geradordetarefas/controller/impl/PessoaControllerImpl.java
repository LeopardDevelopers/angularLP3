	package com.geradordetarefas.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.geradordetarefas.controller.PessoaController;
import com.geradordetarefas.core.model.entity.Pessoa;
import com.geradordetarefas.service.PessoaService;

import reactor.core.publisher.Mono;

@RestController
public class PessoaControllerImpl implements PessoaController {

	@Autowired
	PessoaService pessoaService;

	@Override
	public Mono<List<Pessoa>> getPessoas() {
		List<Pessoa> listaAlunos = this.pessoaService.getAll();

		return Mono.just(listaAlunos);
	}

	@Override
	public Mono<Pessoa> savePessoa(@RequestBody Pessoa pessoa) {
		pessoa = this.pessoaService.save(pessoa);

		return Mono.just(pessoa);
	}
	
	@Override
	public boolean deletePessoa(@PathVariable("id") Long idPessoa) {
		this.pessoaService.delete(idPessoa);
		
		return true;
	}
	
}
