import { UserService } from "../../domain/services";
import { badRequest, noContent, serverError, ok } from "../../presentation";
import { MissingParamsError } from "../../presentation/errors";
import { Controller, HttpResponse } from "../protocols";

namespace PostSignIn {
  export interface Request {
    email: string;
    password: string;
  }

  export interface Response {
    name: string;
  }
}

export class PostSignInController implements Controller {
  constructor(private readonly userService: UserService) {}

  async handle(request: PostSignIn.Request): Promise<HttpResponse> {
    const { email, password } = request;

    if (!email || !password) {
      return badRequest(new MissingParamsError());
    }

    try {
      const shouldLogin = await this.userService.validatePassword(
        email,
        password
      );

      if (shouldLogin) {
        // create session

        const user = await this.userService.findByEmail(email);

        if (user) {
          const response: PostSignIn.Response = {
            name: user.name,
          };
          return ok(response);
        }
      }
      return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
