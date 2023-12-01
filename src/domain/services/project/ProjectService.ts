import { ProjectRepository } from "../../../infrastructure/repository";
import { ForbiddenError, NotFoundError } from "../../../presentation/errors";
import { NewProject } from "../../models";
import { ProjectDto } from "..";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(project: NewProject) {
    return this.projectRepository.save(project);
  }

  async findByUserId(userId: number) {
    return this.projectRepository.findByUserId(userId);
  }

  async validateUserIsProjectMember(userId: number, projectId: number) {
    const userProjects = await this.projectRepository.findByUserId(userId);
    const memberOfProjectIds = userProjects.map((project) => project.id);

    if (!memberOfProjectIds.includes(projectId)) {
      throw new ForbiddenError("User is not member of selected project");
    }
  }

  private async validateProjectBelongsToUser(
    projectId: number,
    userId: number
  ): Promise<ProjectDto> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenError();
    }

    return project;
  }

  private async updateMembers(
    id: number,
    currentMemberIds: number[],
    requestedMemberIds: number[]
  ) {
    const removedMembers = currentMemberIds.filter(
      (memberId) => !requestedMemberIds.includes(memberId)
    );

    const newMembers = requestedMemberIds.filter(
      (memberId) => !currentMemberIds.includes(memberId)
    );

    await this.projectRepository.updateMembers(id, removedMembers, newMembers);
  }

  async update(
    id: number,
    updatedProject: Partial<NewProject>,
    requestedById: number
  ) {
    const project = await this.validateProjectBelongsToUser(id, requestedById);

    await this.projectRepository.update(id, updatedProject);

    const requestedByProjectOwner = requestedById === project.ownerId;

    if (requestedByProjectOwner && updatedProject.memberIds?.length) {
      const currentMemberIds = project.members.map((member) => member.id);
      await this.updateMembers(id, currentMemberIds, updatedProject.memberIds);
    }
  }

  async delete(id: number, requestedById: number) {
    await this.validateProjectBelongsToUser(id, requestedById);

    await this.projectRepository.delete(id);
  }
}
