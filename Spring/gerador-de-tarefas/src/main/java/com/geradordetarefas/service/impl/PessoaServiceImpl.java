package com.geradordetarefas.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geradordetarefas.core.model.entity.Alocacao;
import com.geradordetarefas.core.model.entity.Pessoa;
import com.geradordetarefas.core.model.repository.AlocacaoRepository;
import com.geradordetarefas.core.model.repository.PessoaRepository;
import com.geradordetarefas.service.PessoaService;


@Service
public class PessoaServiceImpl implements PessoaService {

	@Autowired
	PessoaRepository pessoaRepository;
	
	@Autowired
	AlocacaoRepository alocacaoRepository;

	@Override
	public List<Pessoa> getAll() {
		return this.pessoaRepository.findAll();
	}

	@Override
	public Pessoa save(Pessoa pessoa) {
		pessoa = this.pessoaRepository.save(pessoa);
		return pessoa;
	}

	@Override
	public boolean delete(Long id){
		List<Alocacao> x = this.alocacaoRepository.findByPessoaId(id);
		
		this.alocacaoRepository.deleteAll(x);		
		this.pessoaRepository.deleteById(id);
		
		return true;
	}
	
}