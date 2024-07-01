const { getAllBlogs, getBlogByIds, insertBlogs, updateBlogByIds, deleteBlogByIds } = require('../services/blogServices');

const getAllBlog = async (req, res) => {
    try {
        const blogs = await getAllBlogs();
        if (blogs.length <= 0) {
            return res.status(404).send('Empty blog list');
        } else {
            res.json(blogs);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blogId = req.query.BlogId;
        const blog = await getBlogByIds(blogId);
        if (blog.length <= 0) {
            return res.status(404).send('Empty blog');
        } else {
            res.json(blog);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const insertBlog = async (req, res) => {
    try {
        const { UserId, Content, Title } = req.body;
        if (UserId && Content && Title) {
            const blog = { UserId, Content, Title };
            const check = await insertBlogs(blog);
            if (check === false) {
                return res.status(500).send('Insert blog failed');
            } else {
                return res.status(200).send('Insert blog successfully');
            }
        } else {
            return res.status(400).send('UserId, Content, and Title are required');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteBlogById = async (req, res) => {
    try {
        const { BlogId } = req.body;
        const find = await getBlogByIds(BlogId);
        if (find.length <= 0) {
            return res.status(404).send('Blog does not exist');
        } else {
            const check = await deleteBlogByIds(BlogId);
            if (check === false) {
                return res.status(500).send('Delete blog failed');
            } else {
                return res.status(200).send('Delete blog successfully');
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const updateBlogById = async (req, res) => {
    try {
        const { Title, Content, DateCreated, UserId, BlogId } = req.body;
        const find = await getBlogByIds(BlogId);
        if (find.length <= 0) {
            return res.status(404).send('Blog does not exist');
        } else {
            if (Title && Content && DateCreated && UserId && BlogId) {
                const blog = { Title, Content, DateCreated: new Date(DateCreated), UserId, BlogId };
                const check = await updateBlogByIds(blog);
                if (check === false) {
                    return res.status(500).send('Update blog failed');
                } else {
                    return res.status(200).send('Update blog successfully');
                }
            } else {
                return res.status(400).send('UserId, Content, Title, DateCreated, and BlogId are required');
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBlog,
    getBlogById,
    insertBlog,
    deleteBlogById,
    updateBlogById,
};
