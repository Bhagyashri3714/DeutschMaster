package com.deutschmaster.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deutschmaster.backend.entity.Vocabulary;
import com.deutschmaster.backend.repo.VocabularyRepo;

@Service
public class VocabularyService {

	@Autowired
	private VocabularyRepo vocabularyRepo;
	
	public Vocabulary addWord(Vocabulary vocabulary) {
		return vocabularyRepo.save(vocabulary);
	}
	
	public List<Vocabulary> getAllWords() {
		return vocabularyRepo.findAll();
	}

	public void deleteWord(Integer id) {
	    vocabularyRepo.deleteById(id);
	}
	
	public Vocabulary updateWord(Integer id, Vocabulary updatedVocabulary) {

	    Vocabulary vocabulary = vocabularyRepo.findById(id).orElse(null);

	    if (vocabulary != null) {

	        vocabulary.setGermanWord(updatedVocabulary.getGermanWord());
	        vocabulary.setEnglishMeaning(updatedVocabulary.getEnglishMeaning());
	        vocabulary.setCategory(updatedVocabulary.getCategory());
	        vocabulary.setExample(updatedVocabulary.getExample());

	        return vocabularyRepo.save(vocabulary);
	    }

	    return null;
	}


	public Optional<Vocabulary> findById(Integer id) {
		return vocabularyRepo.findById(id);
	}
	
	public List<Vocabulary> getByLevel(String level) {
	    return vocabularyRepo.findByLevel(level);
	}
}
