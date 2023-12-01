import { PrismaClient } from "@prisma/client";
import { NewProject } from "../../domain/models";

export class ProjectRepository {
  constructor(private readonly client: PrismaClient) {}

  async save(project: NewProject) {
    return this.client.project.create({
      data: {
        name: project.title,
        description: project.description,
        ownerId: project.ownerId,
        members: {
          connect: project.memberIds.map((memberId) => ({ id: memberId })),
        },
      },
    });
  }

  async findById(id: number) {
    return this.client.project.findUnique({
      where: {
        id,
      },
      include: { members: true },
    });
  }

  async findByUserId(userId: number) {
    return this.client.project.findMany({
      where: {
        members: { some: { id: userId } },
      },
    });
  }

  async update(id: number, project: Partial<NewProject>) {
    return this.client.project.update({
      where: {
        id,
      },
      data: {
        name: project.title,
        description: project.description,
      },
    });
  }

  async updateMembers(
    id: number,
    removedMemberIds: number[],
    newMemberIds: number[]
  ) {
    return this.client.project.update({
      where: {
        id,
      },
      data: {
        members: {
          disconnect: removedMemberIds.map((memberId) => ({ id: memberId })),
          connect: newMemberIds.map((memberId) => ({ id: memberId })),
        },
      },
    });
  }

  async delete(id: number) {
    await this.client.project.delete({
      where: {
        id,
      },
    });
  }
}
