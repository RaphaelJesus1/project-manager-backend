import { PrismaClient, Task } from "@prisma/client";
import { NewTask } from "../../domain/models";

export class TaskRepository {
  constructor(private readonly client: PrismaClient) {}

  async save(task: NewTask) {
    return this.client.task.create({
      data: {
        description: task.description,
        projectId: task.projectId,
        status: task.status,
        tagId: task.tagId,
        title: task.title,
        createdBy: task.createdById,
        userId: task.userId,
      },
    });
  }

  async findByProjectId(projectId: number) {
    return this.client.task.findMany({
      where: {
        project: { id: projectId },
      },
    });
  }

  async findByIds(ids: number[]) {
    return this.client.task.findMany({
      where: { id: { in: ids } },
    });
  }

  async findById(id: number): Promise<Task | null> {
    const [task] = await this.findByIds([id]);
    return task;
  }

  async update(id: number, task: Partial<NewTask>) {
    return this.client.task.update({
      where: {
        id,
      },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        tagId: task.tagId,
        userId: task.userId,
      },
    });
  }

  async deleteMany(ids: number[]) {
    await this.client.project.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async delete(id: number) {
    return this.deleteMany([id]);
  }
}
