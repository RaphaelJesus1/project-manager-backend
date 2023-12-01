import { Project, User } from "@prisma/client";

export interface UserDto extends User {
  projectsMember: Project[];
}
