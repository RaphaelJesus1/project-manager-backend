import { ForbiddenError, NotFoundError } from "../../../presentation/errors";
import { NewTask, taskStatus } from "../../models";
import { ProjectService } from "..";
import { TaskRepository } from "../../../infrastructure/repository";
import { TaskStatus } from "@prisma/client";

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectService: ProjectService
  ) {}

  private async validateProjectMember(userId: number, projectId: number) {
    return this.projectService.validateUserIsProjectMember(userId, projectId);
  }

  async create(projectId: number, task: NewTask) {
    await this.validateProjectMember(task.createdById, projectId);

    await this.taskRepository.save(task);
  }

  async update(
    id: number,
    updatedTask: Partial<NewTask>,
    requestedById: number
  ) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    if (updatedTask.status === taskStatus.done) {
      throw new ForbiddenError("Cannot update finished tasks");
    }

    await this.validateProjectMember(requestedById, task.projectId);

    await this.taskRepository.update(id, updatedTask);
  }

  async updateStatus(id: number, status: TaskStatus, requestedById: number) {
    return this.update(id, { status }, requestedById);
  }

  async deleteMany(ids: number[], requestedById: number) {
    const tasks = await this.taskRepository.findByIds(ids);
    if (!tasks.length) {
      throw new NotFoundError("Task(s) not found");
    }

    const projectIds = tasks.map((task) => task.projectId);
    const projectIdsDistinct = [...new Set(projectIds)];
    for (const projId of projectIdsDistinct) {
      await this.validateProjectMember(requestedById, projId);
    }

    await this.taskRepository.deleteMany(ids);
  }

  async delete(id: number, requestedById: number) {
    await this.deleteMany([id], requestedById);
  }
}
