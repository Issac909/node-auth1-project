const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  const userInfo = req.body;

  const NumofHashRounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, NumofHashRounds);

  userInfo.password = hash;

  Users.add(userInfo)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // remember this client
        req.session.user = {
          id: user.id,
          username: user.username,
        };

        res.status(200).json({ hello: user.username });
      } else {
        res.status(401).json({
          message:
            "Could not find existing user with that password. Please try again ",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: "error finding the user" });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ errorMessage: "Logout error" });
      } else {
        res.status(200).json({ message: "Logged out" });
      }
    });
  } else {
    res.status(200).json("Not logged in");
  }
});

module.exports = router;
