package com.deutschmaster.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deutschmaster.backend.entity.Grammar;
import com.deutschmaster.backend.repo.GrammarRepo;

@Service
public class GrammarService {

	@Autowired
	private GrammarRepo repo;
	
	public Grammar addGrammar(Grammar grammar) {
		return repo.save(grammar);
	}
	
	public List<Grammar> getAll() {
		return repo.findAll();
	}
	
	public List<Grammar> getByLevel(String level) {
        return repo.findByLevel(level);
    }

	
	public Optional<Grammar> getGrammarById(Integer id) {
		return repo.findById(id);
	}
	
	public void deleteGrammar(Integer id) {
		repo.deleteById(id);
	}
	
	public Grammar updateGrammar(Integer id, Grammar updatedGrammar) {

	    Grammar grammar = repo.findById(id).orElse(null);

	    if (grammar != null) {

	        grammar.setTitle(updatedGrammar.getTitle());
	        grammar.setExplanation(updatedGrammar.getExplanation());
	        grammar.setExample(updatedGrammar.getExample());

	        return repo.save(grammar);
	    }

	    return null;
	}
}
