package com.geradordetarefas.service;

import java.util.List;

import com.geradordetarefas.core.model.entity.Tarefa;

public interface TarefaService {
	public List<Tarefa> getAll();

	public Tarefa save(Tarefa tarefa);
	
	boolean delete(Long id);
}