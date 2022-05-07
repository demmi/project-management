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
  id?: string;
  title: string;
}

export interface Column {
  id?: string;
  title: string;
  order: number;
  boardId?: string;
}

export interface Task {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: { description: string };
  boardId?: { description: string };
  columnId?: string;
}

export interface ConfirmDialogData {
  entityType: 'board' | 'column' | 'task';
  entity: Board | Column | Task;
}

export interface AddColumnDialogData {
  boardId: string;
  order: number;
}
