package com.geradordetarefas.core.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geradordetarefas.core.model.entity.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long>{

}
