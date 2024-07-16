//Gem functionality handles receiving and sending data from the database to the user
const { getAllBlogs, getBlogByIds, insertBlogs, updateBlogByIds, deleteBlogByIds } = require('../services/blogServices');

const getAllBlog = async (req, res) => {
    try {
        const blog = await getAllBlogs();

        if (blog.length <= 0) {
            return res
                .status(404)
                .send('Empty blog list')
        } else {
            res.json(blog);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getBlogById = async (req, res) => {
    try {
        const blogId = req.query.BlogId
        const blog = await getBlogByIds(blogId);
        console.log(blog);
        if (blog.length <= 0) {
            return res
                .status(404)
                .send('Empty blog')
        } else {
            res.json(blog);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error)
    }
}

const insertBlog = async (req, res) => {
    try {
        const { UserId, Content, Title } = req.body

        if (UserId && Content && Title) {
            const blog = {
                UserId: UserId,
                Content: Content,
                Title: Title
            }
            const check = await insertBlogs(blog);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert blog fail')
            } else {
                return res
                    .status(200)
                    .send('Insert blog successfully')
            }
        } else {
            return res
                .status(400)
                .send('UserId,content and title is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const deleteBlogById = async (req, res) => {
    try {
        const { BlogId } = req.body;
        const find = await getBlogById(BlogId);
        if (find.length <= 0) {
            return res
                .status(404)
                .send('Blog does not exist')
        } else {
            const check = await deleteBlogByIds(BlogId);
            if (check == false) {
                return res
                    .status(500)
                    .send('Delete blog fail')
            } else {
                return res
                    .status(200)
                    .send('Delete blog successfully')
            }
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const updateBlogById = async (req, res) => {
    try {
        const { Title, Content, DateCreated, UserId, BlogId } = req.body
        let find = await getBlogById(BlogId);
        if (find.length <= 0) {
            return res
                .status(404)
                .send('Blog does not exist')
        } else {
if (Title && Content && DateCreated && UserId && BlogId) {
                const blog = {
                    Title: Title,
                    Content: Content,
                    DateCreated: DateCreated,
                    UserID: UserId,
                    BlogId: BlogId,
                }
                const check = await updateBlogByIds(blog);
                if (check == false) {
                    return res
                        .status(500)
                        .send('Update cost gem fail')
                } else {
                    return res
                        .status(200)
                        .send('Update cost gem successfully')
                }
            } else {
                return res
                    .status(400)
                    .send('UserId,content and title is required')
            }

        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

module.exports = {
    getAllBlog,
    getBlogById,
    insertBlog,
    deleteBlogById,
    updateBlogById,
}