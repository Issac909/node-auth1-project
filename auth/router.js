const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const userInfo = req.body;

    const ROUNDS = process.env.HASH_ROUNDS || 8
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS)

    userInfo.password = hash;

    Users
        .add(userInfo)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;