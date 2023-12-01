import { Project, User } from "@prisma/client";

export interface ProjectDto extends Project {
  members: User[];
}
