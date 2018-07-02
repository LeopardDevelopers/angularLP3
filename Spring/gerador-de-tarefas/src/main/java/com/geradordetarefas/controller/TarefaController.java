package com.geradordetarefas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.geradordetarefas.core.model.entity.Tarefa;

import reactor.core.publisher.Mono;

@RequestMapping("/tarefa")
public interface TarefaController {
	
	@GetMapping("/all")
	Mono<List<Tarefa>> getTarefas();

	@PostMapping("/save")
	Mono<Tarefa> saveTarefa(@RequestBody Tarefa tarefa);

	@DeleteMapping("/delete/{id}")
	boolean deletePessoa(@PathVariable("id") Long idTarefa);
	
}
