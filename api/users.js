/*
///////////////////
// Dependencies //
/////////////////
*/

const express = require('express');
const usersRouter = express.Router();

const { getAllUsers } = require('../db');

/*
////////////////
// Listeners //
//////////////
*/

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});
usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        "users": [...users]
    });
});

/*
/////////////
// Export //
///////////
*/

module.exports = usersRouter;