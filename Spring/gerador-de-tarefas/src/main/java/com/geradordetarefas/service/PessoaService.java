package com.geradordetarefas.service;

import java.util.List;

import com.geradordetarefas.core.model.entity.Pessoa;

public interface PessoaService {
	public List<Pessoa> getAll();

	public Pessoa save(Pessoa pessoa);
	
	boolean delete(Long id);
}
