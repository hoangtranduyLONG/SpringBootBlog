package com.example.blog.service.impl;


import com.example.blog.model.Post;
import com.example.blog.repository.PostRepository;
import com.example.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    @Override
    public Iterable<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public void save(Post post) {
        postRepository.save(post);
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public Iterable<Post> findByAuthorName(String name) {
        return postRepository.findAllByAuthorName(name);
    }

    @Override
    public Iterable<Post> findByAuthorId(Long id) {
        return postRepository.findAllByAuthorId(id);
    }
}