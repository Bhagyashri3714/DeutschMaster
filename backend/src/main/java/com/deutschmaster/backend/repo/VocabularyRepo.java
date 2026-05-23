package com.deutschmaster.backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deutschmaster.backend.entity.Vocabulary;

public interface VocabularyRepo extends JpaRepository<Vocabulary, Integer>{
	
	
	 List<Vocabulary> findByLevel(String level);

}
