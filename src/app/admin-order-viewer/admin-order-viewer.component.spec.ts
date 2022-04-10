import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderViewerComponent } from './admin-order-viewer.component';

describe('AdminOrderViewerComponent', () => {
  let component: AdminOrderViewerComponent;
  let fixture: ComponentFixture<AdminOrderViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
