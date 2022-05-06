import { EntityMetadataMap } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Board: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Column: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Task: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};

