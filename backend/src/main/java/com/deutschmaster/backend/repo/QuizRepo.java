package com.deutschmaster.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deutschmaster.backend.entity.Quiz;

public interface QuizRepo extends JpaRepository<Quiz, Integer>{

	List<Quiz> findByLevel(String level);
}
