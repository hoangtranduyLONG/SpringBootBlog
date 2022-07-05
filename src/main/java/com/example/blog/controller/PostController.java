package com.example.blog.controller;

import com.example.blog.model.Post;
import com.example.blog.service.PostService;
import com.example.blog.service.UserService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class PostController {
    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @GetMapping("/home")
    public ResponseEntity<Iterable<Post>> showHome() {
        Iterable<Post> posts = postService.findAll();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/home/search")
    public ResponseEntity<Iterable<Post>> search(@RequestParam String name) {
        Iterable<Post> posts = postService.findByAuthorName("%" + name + "%");
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> addPost(@RequestBody Post post) {
        post.setCreateAt(LocalDateTime.now());
        postService.save(post);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @GetMapping("/posts")
    public ResponseEntity<Iterable<Post>> findByAuthorId(@RequestParam Long authorId) {
        Iterable<Post> posts = postService.findByAuthorId(authorId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @DeleteMapping("/posts")
    public ResponseEntity<Post> remove(@RequestParam Long id) {
        postService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}