import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishcreateComponent } from './dishcreate.component';

describe('DishcreateComponent', () => {
  let component: DishcreateComponent;
  let fixture: ComponentFixture<DishcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
