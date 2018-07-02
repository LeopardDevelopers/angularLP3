package com.geradordetarefas.core.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geradordetarefas.core.model.entity.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

}
