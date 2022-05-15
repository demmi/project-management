import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Column } from '../../../interface/interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColumnEntityService extends EntityCollectionServiceBase<Column> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Column', serviceElementFactory);
  }

}
