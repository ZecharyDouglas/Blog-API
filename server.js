const session = require("express-session");
const bcrypt = require("bcryptjs");
const { User, Comments, Posts } = require("./models");
const express = require("express");
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  })
);

//handle the signup
app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Send a response to the client informing them that the user was successfully created
    req.session.userId = user.id;
    res.status(201).json({
      message: "User created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(422)
        .json({ errors: error.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: error,
    });
  }
});

//handle the sign in
app.post("/login", async (req, res) => {
  try {
    // First, find the user by their email address
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      // If the user isn't found in the database, return an 'incorrect credentials' message
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // Passwords match
        // TODO: Create a session for this user
        req.session.userId = user.id;
        res.status(200).json({
          message: "Logged in successfully",
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: "Incorrect credentials" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

//handle the user log out
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

//////////////////posts table operations///////////////////////

app.get("/posts", async (req, res) => {
  try {
    const allPosts = await Posts.findAll();
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/posts/:postID", async (req, res) => {
  const postID = req.params.postID;
  try {
    const post = await Posts.findOne({ where: { id: postID } });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send({ message: "Post cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    newPost = await Posts.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.patch("/posts/:postID", async (req, res) => {
  const postId = req.params.postID;
  try {
    const [numAffectedRows, affectedRows] = await Posts.update(req.body, {
      where: { id: postId },
      returning: true,
    });
    if (numAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Post cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.delete("/posts/:postID", async (req, res) => {
  const postID = req.params.postID;
  try {
    const deletePost = await Posts.destroy({ where: { id: postID } });
    if (deletePost > 0) {
      res.status(200).send({ message: "Post was deleted Successfully!" });
    } else {
      res.status(404).send({ message: "Post cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

//////////////////comments table operations////////////////////

app.get("/comments", async (req, res) => {
  try {
    const allComments = await Comments.findAll();
    res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/comments/:commentID", async (req, res) => {
  const commentID = req.params.commentID;
  try {
    const comment = await Posts.findOne({ where: { id: commentID } });
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).send({ message: "Comment cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.post("/comments", async (req, res) => {
  try {
    const newComment = await Comments.create({
      comment_content: req.body.comment_content,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.patch("/comments/:commentID", async (req, res) => {
  const commentID = req.params.commentID;
  try {
    const [numAffectedRows, affectedRows] = await Comments.update(req.body, {
      where: { id: commentID },
      returning: true,
    });
    if (numAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Comment cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.delete("/comments/:commentID", async (req, res) => {
  const commentID = req.params.commentID;
  try {
    const deleteComment = await Posts.destroy({ where: { id: commentID } });
    if (deleteComment > 0) {
      res.status(200).send({ message: "Comment was deleted Successfully!" });
    } else {
      res.status(404).send({ message: "Comment cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
