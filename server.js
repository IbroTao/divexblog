const express = require("express");
const { mongoConnection } = require("./configs/mongo.configs");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const adminRouter = require("./routes/admin.routes");
const articleRouter = require("./routes/article.routes");
require("dotenv").config();
const port = process.env.PORT;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/user", userRouter);
server.use("/post", postRouter);
server.use("/admin", adminRouter);
server.use("/blog", articleRouter);

const runServer = (port) => {
  mongoConnection()
    .then((res) => {
      server.listen(port);
      console.log(`Server is running on PORT ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
runServer(port);
