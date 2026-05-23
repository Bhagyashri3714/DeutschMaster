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

import com.deutschmaster.backend.entity.Vocabulary;
import com.deutschmaster.backend.service.VocabularyService;

@RestController
@RequestMapping("/vocabulary")
@CrossOrigin("*")
public class VocabularyController {

	@Autowired
	private VocabularyService vocabularyService;
	
	@PostMapping("/add")
	public Vocabulary addWord(@RequestBody Vocabulary vocabulary) {
        return vocabularyService.addWord(vocabulary);
    }
	
	@GetMapping("/all")
	public List<Vocabulary> getAllWords(
	        @RequestParam(required = false) String level) {

	    if (level != null) {
	        return vocabularyService.getByLevel(level);
	    }

	    return vocabularyService.getAllWords();
	}
	 
	 @DeleteMapping("/delete/{id}")
	 public String deleteWord(@PathVariable Integer id) {

	     vocabularyService.deleteWord(id);

	     return "Vocabulary Deleted Successfully";
	 }
	 
	 @GetMapping("/{id}")
	 public Optional<Vocabulary> getById(@PathVariable Integer id) {
		 return vocabularyService.findById(id);
	 }
	 
	 @PutMapping("/update/{id}")
	 public Vocabulary updateWord(
	         @PathVariable Integer id,
	         @RequestBody Vocabulary vocabulary) {

	     return vocabularyService.updateWord(id, vocabulary);
	 }
}
