export interface Registration {
  name: string;
  login: string;
  password: string;
}

export interface Auth {
  login: string;
  password: string;
}

export interface Board {
  id: string;
  title: string;
}

export interface BoardChange {
  title: string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export interface ColumnChange {
  title: string;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: { description: string };
  boardId: { description: string };
  columnId: string;
}

export interface TaskCreate {
  title: string;
  order: number;
  description: string;
  userId: { description: string };
}

export interface TaskUpdate {
  title: string;
  order: number;
  description: string;
  userId: { description: string };
  boardId: { description: string };
  columnId: string;
}
