import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishcategorylistComponent } from './dishcategorylist.component';

describe('DishcategorylistComponent', () => {
  let component: DishcategorylistComponent;
  let fixture: ComponentFixture<DishcategorylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishcategorylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishcategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
