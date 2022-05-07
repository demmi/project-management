import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Board } from '../../interface/interface';

@Injectable({ providedIn: 'root' })
export class BoardEntityService extends EntityCollectionServiceBase<Board> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Board', serviceElementFactory);
  }

}
