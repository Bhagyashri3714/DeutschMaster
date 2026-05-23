package com.deutschmaster.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deutschmaster.backend.entity.User;


public interface UserRepo extends JpaRepository<User, Integer> {	

	    Optional<User> findByUsername(String username);
}
