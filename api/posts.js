/*
///////////////////
// Dependencies //
/////////////////
*/

const express = require('express');
const postsRouter = express.Router();

const { getAllPosts } = require('../db');

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

/*
/////////////
// Export //
///////////
*/

module.exports = postsRouter;