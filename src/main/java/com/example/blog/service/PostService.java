package com.example.blog.service;
import com.example.blog.model.Post;
import com.example.blog.model.Role;

public interface PostService {
    Iterable<Post> findAll();

    void save(Post post);

    void delete(Long id);

    Iterable<Post> findByAuthorName(String name);

    Iterable<Post> findByAuthorId(Long id);
}