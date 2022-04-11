import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsignupComponent } from './modalsignup.component';

describe('ModalsignupComponent', () => {
  let component: ModalsignupComponent;
  let fixture: ComponentFixture<ModalsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
