package com.deutschmaster.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deutschmaster.backend.entity.Quiz;
import com.deutschmaster.backend.repo.QuizRepo;

@Service
public class QuizService {

    @Autowired
    private QuizRepo repo;

    // ADD
    public Quiz addQuiz(Quiz quiz) {
        return repo.save(quiz);
    }

    // GET ALL
    public List<Quiz> getAllQuiz(String level) {

        if(level != null) {
            return repo.findByLevel(level);
        }

        return repo.findAll();
    }

    // DELETE
    public void deleteQuiz(Integer id) {
        repo.deleteById(id);
    }

    // GET BY ID
    public Optional<Quiz> getById(Integer id) {
        return repo.findById(id);
    }

    // UPDATE
    public Quiz updateQuiz(Integer id, Quiz updatedQuiz) {

        Quiz quiz = repo.findById(id).orElse(null);

        if(quiz != null) {

            quiz.setQuestion(updatedQuiz.getQuestion());
            quiz.setOptionA(updatedQuiz.getOptionA());
            quiz.setOptionB(updatedQuiz.getOptionB());
            quiz.setOptionC(updatedQuiz.getOptionC());
            quiz.setOptionD(updatedQuiz.getOptionD());
            quiz.setCorrectAnswer(updatedQuiz.getCorrectAnswer());
            quiz.setLevel(updatedQuiz.getLevel());

            return repo.save(quiz);
        }

        return null;
    }
}