const express = require('express');
const { connectToDatabase } = require('../config/database');

// Get all blog posts from database function
const getAllBlogs = async () => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = "SELECT * FROM Blogs";
        const result = await request.query(sqlString);
        const blogs = result.recordset;
        console.log(blogs);
        return blogs;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Get blog post by ID from database function
const getBlogByIds = async (blogId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = "SELECT * FROM Blogs WHERE BlogId = @blogId";
        request.input('blogId', blogId);
        const result = await request.query(sqlString);
        const blog = result.recordset;
        console.log(blog);
        return blog;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
};
const getDayNow = () => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
        return date;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}
// Insert blog post to database function
const insertBlogs = async (blog) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        INSERT INTO Blogs (Title, Content, DateCreated, UserId) 
        VALUES (@title, @content, @dateCreated, @userId)
        `;
        request.input('title', blog.Title);
        request.input('content', blog.Content);
        request.input('dateCreated', getDayNow());
        request.input('userId', blog.UserId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        throw new Error("Error inserting blog: " + error.message);
        return false;
    }
};

// Update blog post on database function
const updateBlogByIds = async (blog) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request(); const sqlString = `
            UPDATE Blogs
            SET Title = @title, Content = @content, DateCreated = @dateCreated, UserId = @userId
            WHERE BlogId = @blogId
        `;
        request.input('title', blog.Title);
        request.input('content', blog.Content);
        request.input('dateCreated', blog.DateCreated);
        request.input('userId', blog.UserId);
        request.input('blogId', blog.BlogId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

// Delete blog post by ID on database function
const deleteBlogByIds = async (blogId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = "DELETE FROM Blogs WHERE BlogId = @blogId";
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
    getBlogByIds,
    insertBlogs,
    updateBlogByIds,
    deleteBlogByIds
};
