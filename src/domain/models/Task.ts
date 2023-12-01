import { TaskStatus } from "@prisma/client";

export interface NewTask {
  title: string;
  description: string;
  status: TaskStatus;
  projectId: number;
  tagId?: number;
  createdById: number;
  userId?: number;
}

export interface Task extends NewTask {
  id: number;
  createdAt: Date;
}

export const taskStatus = {
  pending: "Pending",
  inProgress: "InProgress",
  done: "Done",
};
