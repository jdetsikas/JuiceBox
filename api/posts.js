/*
///////////////////
// Dependencies //
/////////////////
*/

const express = require('express');
const postsRouter = express.Router();

const { requireUser } = require('./utils');
const { getAllPosts, createPost, updatePost, getPostById } = require('../db');

/*
////////////////
// Listeners //
//////////////
*/

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");

    next();
});

postsRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.send({
        "posts": [...posts]
    });
});

postsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;

    const tagArr = tags.trim().split(/\s+/);
    const postData = {};

    if (tagArr.length) {
        postData.tags = tagArr;
    };

    try {
        postData.authorId = req.user.id;
        postData.title = title;
        postData.content = content;
        
        const post = await createPost(postData);

        if (post) {
            res.send({ post });
        } else {
            next({
                name: "InvalidPostFormat",
                message: "Post is missing data"
            });
        };
    } catch ({ name, message }) {
        next ({ name, message });
    };
});

postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
    const { postId } = req.params;
})

/*
/////////////
// Export //
///////////
*/

module.exports = postsRouter;
