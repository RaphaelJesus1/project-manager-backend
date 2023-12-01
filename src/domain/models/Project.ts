export interface NewProject {
  title: string;
  description: string;
  ownerId: number;
  memberIds: number[];
}

export interface Project extends NewProject {
  id: number;
  createdAt: Date;
}
