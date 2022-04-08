import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartRestaurantCategoryComponent } from './cart-restaurant-category.component';

describe('CartRestaurantCategoryComponent', () => {
  let component: CartRestaurantCategoryComponent;
  let fixture: ComponentFixture<CartRestaurantCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartRestaurantCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartRestaurantCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
