import { AuthRouter } from "./auth/AuthRouter";
// import { ProjectsRouter } from "./projects/ProjectsRouter";
import { Router } from "express";
// import { UsersRouter } from "./users/UsersRouter";

export const appRouter = Router();

appRouter.use("/auth", AuthRouter);
// appRouter.use("/projects", ProjectsRouter);
// appRouter.use("/users", UsersRouter);
