import { PostUserController, PostSignInController } from "../../controllers";
import { resource } from "../../../ResourceFactory";
import { UserRepository } from "../../../infrastructure/repository";
import { UserService } from "../../../domain/services";

const userRepository = new UserRepository(resource.prisma);
const userService = new UserService(userRepository);

export const postUserController = new PostUserController(userService);
export const postSignInController = new PostSignInController(userService);
