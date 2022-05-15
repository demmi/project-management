export interface Board {
  id?: string;
  title: string;
  columns?: Array<Column>;
}

export interface Column {
  id?: string;
  title: string;
  order: number;
  boardId?: string;
  tasks: Task[];
}

export interface Task {
  id?: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: { description: string };
  boardId?: { description: string };
  columnId?: string;
  files?: File[];
}

export interface File {
  filename: string;
  fileSize: number;
}

export interface ConfirmDialogData {
  entityType: 'board' | 'column' | 'task';
  entity: Board | Column | Task;
}

export interface AddColumnDialogData {
  boardId: string;
  order: number;
}
