package com.geradordetarefas.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.geradordetarefas.controller.AlocacaoController;
import com.geradordetarefas.core.model.entity.Alocacao;
import com.geradordetarefas.service.AlocacaoService;

import reactor.core.publisher.Mono;

@RestController
public class AlocacaoControllerImpl implements AlocacaoController {
	
	@Autowired
	AlocacaoService alocacaoService;

	@Override
	public List<Alocacao> getAlocacoesByTarefaId(@PathVariable("id") Long tarefa_id) {
		return this.alocacaoService.findAlocaByTarefaId(tarefa_id);
	}
	
	@Override
	public List<Alocacao> getAlocacoesByPessoaId(@PathVariable("id") Long pessoa_id) {
		return this.alocacaoService.findAlocaByPessoaId(pessoa_id);
	}

	@Override
	public Mono<Alocacao> saveAlocacao(@RequestBody Alocacao alocacao) {
		alocacao = this.alocacaoService.save(alocacao);

		return Mono.just(alocacao);
	}
	
	@Override
	public boolean deleteAlocacao(@PathVariable("id") Long idAlocacao) {
		this.alocacaoService.delete(idAlocacao);
		return true;
	}
}
