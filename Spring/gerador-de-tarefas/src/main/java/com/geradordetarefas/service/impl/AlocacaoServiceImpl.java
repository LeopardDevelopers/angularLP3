package com.geradordetarefas.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geradordetarefas.core.model.entity.Alocacao;
import com.geradordetarefas.core.model.repository.AlocacaoRepository;
import com.geradordetarefas.service.AlocacaoService;

@Service
public class AlocacaoServiceImpl implements AlocacaoService {
	
	@Autowired
	AlocacaoRepository alocacaoRepository;

	@Override
	public List<Alocacao> findAlocaByTarefaId(Long id_tarefa) {
		return this.alocacaoRepository.findByTarefaId(id_tarefa);
	}
	
	@Override
	public List<Alocacao> findAlocaByPessoaId(Long id_pessoa) {
		return this.alocacaoRepository.findByPessoaId(id_pessoa);
	}

	@Override
	public Alocacao save(Alocacao alocacao) {
		alocacao = this.alocacaoRepository.save(alocacao);
		return alocacao;
	}
	
	@Override
	public boolean delete(Long id){
		this.alocacaoRepository.deleteById(id);
		
		return true;
	}
	
}
