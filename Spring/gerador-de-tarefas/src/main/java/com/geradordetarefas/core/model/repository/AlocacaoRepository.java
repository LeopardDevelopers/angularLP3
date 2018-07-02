package com.geradordetarefas.core.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geradordetarefas.core.model.entity.Alocacao;

public interface AlocacaoRepository extends JpaRepository<Alocacao, Long>{
	List<Alocacao> findByTarefaId(Long id_tarefa);
	List<Alocacao> findByPessoaId(Long id_pessoa);
}
