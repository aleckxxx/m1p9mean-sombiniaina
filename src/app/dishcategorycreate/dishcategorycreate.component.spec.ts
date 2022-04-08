import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishcategorycreateComponent } from './dishcategorycreate.component';

describe('DishcategorycreateComponent', () => {
  let component: DishcategorycreateComponent;
  let fixture: ComponentFixture<DishcategorycreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishcategorycreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishcategorycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
