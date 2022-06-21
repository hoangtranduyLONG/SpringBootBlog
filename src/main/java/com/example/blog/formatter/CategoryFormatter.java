package com.example.blog.formatter;

import com.example.blog.model.Category;
import com.example.blog.service.category.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.Formatter;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Locale;
import java.util.Optional;

@Component //tạo ra là 1 bean  không thuộc tầng nào hết
public class CategoryFormatter implements Formatter<Category> {

    private ICategoryService categoryService; //tai sao k can @autowired

    @Autowired
    public CategoryFormatter(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @Override
    public Category parse(String text, Locale locale) throws ParseException {
        Optional<Category> provinceOptional = categoryService.findById(Long.parseLong(text));
        return provinceOptional.orElse(null);
    }

    @Override
    public String print(Category object, Locale locale) {
        return "[" + object.getId() + ", " +object.getName() + "]";
    }
}