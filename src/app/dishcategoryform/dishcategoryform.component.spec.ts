import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishcategoryformComponent } from './dishcategoryform.component';

describe('DishcategoryformComponent', () => {
  let component: DishcategoryformComponent;
  let fixture: ComponentFixture<DishcategoryformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishcategoryformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishcategoryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
