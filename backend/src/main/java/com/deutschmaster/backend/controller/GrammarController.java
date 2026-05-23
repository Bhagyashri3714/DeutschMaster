package com.deutschmaster.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.deutschmaster.backend.entity.Grammar;
import com.deutschmaster.backend.service.GrammarService;

@RestController
@RequestMapping("/grammar")
@CrossOrigin("*")
public class GrammarController {

	@Autowired
	private GrammarService service;

	@PostMapping("/add")
	public Grammar addGrammar(@RequestBody Grammar grammar) {
		return service.addGrammar(grammar);
	}
	
	@GetMapping("/all")
    public List<Grammar> getGrammar(
            @RequestParam(required = false) String level) {

        if (level != null) {
            return service.getByLevel(level);
        }

        return service.getAll();
    }
	
	@GetMapping("/{id}")
	public Optional<Grammar> getGrammarById(@PathVariable Integer id) {
		return service.getGrammarById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteGrammer(@PathVariable Integer id) {
		service.deleteGrammar(id);
	}
	
	@PutMapping("/update/{id}")
	public Grammar updateGrammar(@PathVariable Integer id,@RequestBody Grammar grammar) {
		return service.updateGrammar(id, grammar);
	}
}
