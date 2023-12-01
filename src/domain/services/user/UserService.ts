import { resource } from "../../../ResourceFactory";
import { UserRepository } from "../../../infrastructure/repository";
import {
  AlreadyExistsError,
  NotFoundError,
} from "../../../presentation/errors";
import { NewUser } from "../../models";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: NewUser): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new AlreadyExistsError("User already exists");
    }

    const salt = resource.crypt.salt(12);
    const hashedPassword = resource.crypt.hash(user.password, salt);

    const newUser: NewUser = {
      ...user,
      password: hashedPassword,
    };

    await this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return resource.crypt.compare(password, user.password);
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }
}
