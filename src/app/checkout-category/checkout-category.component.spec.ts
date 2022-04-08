import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCategoryComponent } from './checkout-category.component';

describe('CheckoutCategoryComponent', () => {
  let component: CheckoutCategoryComponent;
  let fixture: ComponentFixture<CheckoutCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
