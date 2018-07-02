package com.geradordetarefas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.geradordetarefas.core.model.entity.Alocacao;

import reactor.core.publisher.Mono;

@RequestMapping("/alocacao")
public interface AlocacaoController {
	
	@GetMapping("/tarefa/search/{id}")
	List<Alocacao> getAlocacoesByTarefaId(@PathVariable("id") Long idTarefa);
	
	@GetMapping("/pessoa/search/{id}")
	List<Alocacao> getAlocacoesByPessoaId(@PathVariable("id") Long idPessoa);

	@PostMapping("/save")
	Mono<Alocacao> saveAlocacao(@RequestBody Alocacao alocacao);
	
	@DeleteMapping("/delete/{id}")
	boolean deleteAlocacao(@PathVariable("id") Long idAlocacao);
	
}
