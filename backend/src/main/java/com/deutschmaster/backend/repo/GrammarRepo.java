package com.deutschmaster.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deutschmaster.backend.entity.Grammar;

public interface GrammarRepo extends JpaRepository<Grammar, Integer>{

	List<Grammar> findByLevel(String level);
}
