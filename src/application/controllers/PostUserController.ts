import { NewUser } from "../../domain/models";
import { UserService } from "../../domain/services";
import { badRequest, noContent, serverError } from "../../presentation";
import { MissingParamsError } from "../../presentation/errors";
import { Controller, HttpResponse } from "../protocols";

namespace PostUser {
  export interface Request {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }
}

export class PostUserController implements Controller {
  constructor(private readonly userService: UserService) {}

  async handle(request: PostUser.Request): Promise<HttpResponse> {
    const { name, email, password, passwordConfirmation } = request;

    if (!name || !email || !password || !passwordConfirmation) {
      return badRequest(new MissingParamsError());
    }

    try {
      const newUser: NewUser = {
        name,
        email,
        password,
      };

      await this.userService.create(newUser);
      return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
