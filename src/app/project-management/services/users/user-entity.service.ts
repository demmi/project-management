import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '../../../auth/model/user.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserEntityService extends EntityCollectionServiceBase<User> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementFactory);
  }

}
