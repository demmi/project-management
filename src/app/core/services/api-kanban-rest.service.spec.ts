import { TestBed } from '@angular/core/testing';

import { ApiKanbanRestService } from './api-kanban-rest.service';

describe('ApiKanbanRestService', () => {
  let service: ApiKanbanRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiKanbanRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
