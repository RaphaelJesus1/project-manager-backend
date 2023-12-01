import { PrismaClient } from "@prisma/client";
import { NewUser } from "../../domain/models";

export class UserRepository {
  constructor(private readonly client: PrismaClient) {}

  async save(user: NewUser) {
    return this.client.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findByEmail(email: string) {
    return this.client.user.findUnique({
      include: { projectsMember: true },
      where: {
        email,
      },
    });
  }

  async delete(id: number) {
    await this.client.user.delete({
      where: {
        id,
      },
    });
  }
}
