package com.example.blog.repository;

import com.example.blog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "select p.id, title, content, author_id, create_at from post p join user_table u on p.author_id = u.id where u.name like :name", nativeQuery = true)
    Iterable<Post> findAllByAuthorName(@Param("name") String name);

    @Query(value = "select id, title, content, author_id, create_at from post where author_id =:id", nativeQuery = true)
    Iterable<Post> findAllByAuthorId(@Param("id") Long id);
}