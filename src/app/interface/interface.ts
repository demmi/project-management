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
  boardId?: string;
  userId?: string;
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

export interface TaskDialogData {
  boardId: string;
  columId: string;
  order: number;
}
