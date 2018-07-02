package com.geradordetarefas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.geradordetarefas.core.model.entity.Pessoa;

import reactor.core.publisher.Mono;

@RequestMapping("/pessoa")
public interface PessoaController {
	
	@GetMapping("/all")
	Mono<List<Pessoa>> getPessoas();

	@PostMapping("/save")
	Mono<Pessoa> savePessoa(@RequestBody Pessoa pessoa);
	
	@DeleteMapping("/delete/{id}")
	boolean deletePessoa(@PathVariable("id") Long idPessoa);

}
