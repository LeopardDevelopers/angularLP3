package com.geradordetarefas.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geradordetarefas.core.model.entity.Alocacao;
import com.geradordetarefas.core.model.entity.Tarefa;
import com.geradordetarefas.core.model.repository.AlocacaoRepository;
import com.geradordetarefas.core.model.repository.TarefaRepository;
import com.geradordetarefas.service.TarefaService;


@Service
public class TarefaServiceImpl implements TarefaService{
	
	@Autowired
	TarefaRepository tarefaRepository;
	
	@Autowired
	AlocacaoRepository alocacaoRepository;

	@Override
	public List<Tarefa> getAll() {
		return this.tarefaRepository.findAll();
	}

	@Override
	public Tarefa save(Tarefa tarefa) {

		tarefa = this.tarefaRepository.save(tarefa);

		return tarefa;
	}
	
	@Override
	public boolean delete(Long id){
		
		List<Alocacao> x = this.alocacaoRepository.findByTarefaId(id);
		this.alocacaoRepository.deleteAll(x);		
		this.tarefaRepository.deleteById(id);
		return true;
	}

}
