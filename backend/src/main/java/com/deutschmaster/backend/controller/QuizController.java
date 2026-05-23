package com.deutschmaster.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.deutschmaster.backend.entity.Quiz;
import com.deutschmaster.backend.service.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // ADD
    @PostMapping("/add")
    public Quiz addQuiz(@RequestBody Quiz quiz) {
        return quizService.addQuiz(quiz);
    }

    // GET ALL
    @GetMapping("/all")
    public List<Quiz> getAllQuiz(
            @RequestParam(required = false) String level
    ) {
        return quizService.getAllQuiz(level);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteQuiz(@PathVariable Integer id) {

        quizService.deleteQuiz(id);

        return "Quiz Deleted Successfully";
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Optional<Quiz> getById(@PathVariable Integer id) {
        return quizService.getById(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Quiz updateQuiz(
            @PathVariable Integer id,
            @RequestBody Quiz quiz
    ) {
        return quizService.updateQuiz(id, quiz);
    }
}