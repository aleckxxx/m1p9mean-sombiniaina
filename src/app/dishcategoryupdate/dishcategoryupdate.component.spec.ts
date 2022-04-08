import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishcategoryupdateComponent } from './dishcategoryupdate.component';

describe('DishcategoryupdateComponent', () => {
  let component: DishcategoryupdateComponent;
  let fixture: ComponentFixture<DishcategoryupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishcategoryupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishcategoryupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
