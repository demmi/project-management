import { EntityMetadataMap } from '@ngrx/data';
import { Task } from '../interface/interface';

export const entityMetadata: EntityMetadataMap = {
  Board: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
  Column: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
  Task: {
    sortComparer: (a: Task, b: Task) => a.order - b.order,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
  User: {},
};

