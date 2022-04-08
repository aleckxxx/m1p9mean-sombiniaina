import { TestBed } from '@angular/core/testing';

import { DishcategoryService } from './dishcategory.service';

describe('DishcategoryService', () => {
  let service: DishcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
