import authRouter from "./auth.js";
import usersRouter from "./users.js";
import postRouter from "./posts.js";

const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/posts", postRouter);
};

export default route;
