import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { Task } from '../../../interface/interface';

@Injectable({ providedIn: 'root' })
export class TaskEntityService extends EntityCollectionServiceBase<Task> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Task', serviceElementFactory);
  }
}
