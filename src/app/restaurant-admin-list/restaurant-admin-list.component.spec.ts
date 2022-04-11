import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAdminListComponent } from './restaurant-admin-list.component';

describe('RestaurantAdminListComponent', () => {
  let component: RestaurantAdminListComponent;
  let fixture: ComponentFixture<RestaurantAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
