const sessionConfig = {
    name: "yummy",
    secret: "Encrypt we give!",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      secure: false, 
      httpOnly: true, 
    },
    resave: false,
    saveUninitialized: true, 
};

module.exports = sessionConfig;