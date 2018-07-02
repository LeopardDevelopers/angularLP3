package com.geradordetarefas.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.geradordetarefas.controller.TarefaController;
import com.geradordetarefas.core.model.entity.Tarefa;
import com.geradordetarefas.service.TarefaService;

import reactor.core.publisher.Mono;

@RestController
public class TarefaControllerImpl implements TarefaController{
	
	@Autowired
	TarefaService tarefaService;

	@Override
	public Mono<List<Tarefa>> getTarefas() {
		List<Tarefa> listaTarefas = this.tarefaService.getAll();

		return Mono.just(listaTarefas);
	}

	@Override
	public Mono<Tarefa> saveTarefa(@RequestBody Tarefa tarefa) {
		tarefa = this.tarefaService.save(tarefa);

		return Mono.just(tarefa);
	}

	@Override
	public boolean deletePessoa(@PathVariable("id") Long idTarefa) {
		this.tarefaService.delete(idTarefa);
		
		return true;
	}
}
