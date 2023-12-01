import { Router } from "express";
import { adaptRoute } from "../../expressRouteAdapter";
import { postUserController } from "./authFactory";

export const AuthRouter = Router();

AuthRouter.post("/sign-up", adaptRoute(postUserController));
