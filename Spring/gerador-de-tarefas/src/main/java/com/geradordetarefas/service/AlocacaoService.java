package com.geradordetarefas.service;

import java.util.List;

import com.geradordetarefas.core.model.entity.Alocacao;

public interface AlocacaoService {
	
	public List<Alocacao> findAlocaByTarefaId(Long id);
	
	public List<Alocacao> findAlocaByPessoaId(Long id);

	public Alocacao save(Alocacao alocacao);
	
	boolean delete(Long id);
	
}
