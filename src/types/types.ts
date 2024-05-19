export type User = {
  id: number;
  name: string;
  email: string;
  classId: number;
};

export type Class = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Task = {
  id: number;
  name: string;
  code: string;
  data: object;
};

export type Score = {
  id: number;
  points: number;
  userId: number;
  taskId: number;
};

export type ApiResponse = {
  users: User[];
  classes: Class[];
  tasks: Task[];
  scores: Score[];
};
