const express = require('express');
const { pool } = require('../config/database');

// Get all blog posts from database function
const getAllBlogs = async () => {
    try {
        await pool.connect();
        const sqlString = "SELECT * FROM Blog";
        const result = await pool.request().query(sqlString);
        const blogs = result.recordset;
        console.log(blogs);
        return blogs;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
};

// Get blog post by ID from database function
const getBlogById = async (blogId) => {
    try {
        await pool.connect();
        const sqlString = "SELECT * FROM Blog WHERE BlogId = @blogId";
        const request = pool.request();
        request.input('blogId', blogId);
        const result = await request.query(sqlString);
        const blog = result.recordset;
        console.log(blog);
        return blog;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
};

// Insert blog post to database function
const insertBlog = async (blog) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO Blog (Title, Content, DateCreated, UserID) 
        VALUES (@title, @content, @dateCreated, @userID)
        `;
        const request = pool.request();
        request.input('title', blog.Title);
        request.input('content', blog.Content);
        request.input('dateCreated', blog.DateCreated);
        request.input('userID', blog.UserID);
        await request.query(sqlString);
        return true;
    } catch (error) {
        throw new Error("Error inserting blog: " + error.message);
        return false;
    }
};

// Update blog post on database function
const updateBlogById = async (blog) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE Blog
            SET Title = @title, Content = @content, DateCreated = @dateCreated, UserID = @userID
            WHERE BlogId = @blogId
        `;
        const request = pool.request();
        request.input('title', blog.Title);
        request.input('content', blog.Content);
        request.input('dateCreated', blog.DateCreated);
        request.input('userID', blog.UserID);
        request.input('blogId', blog.BlogId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

// Delete blog post by ID on database function
const deleteBlogById = async (blogId) => {
    try {
        await pool.connect();
        const sqlString = "DELETE FROM Blog WHERE BlogId = @blogId";
        const request = pool.request();
        request.input('blogId', blogId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    insertBlog,
    updateBlogById,
    deleteBlogById
};
