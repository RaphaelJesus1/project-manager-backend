import { Router } from "express";
import { adaptRoute } from "../../expressRouteAdapter";
import { postSignInController, postUserController } from "./authFactory";

export const AuthRouter = Router();

AuthRouter.post("/sign-up", adaptRoute(postUserController));
AuthRouter.post("/sign-in", adaptRoute(postSignInController));
