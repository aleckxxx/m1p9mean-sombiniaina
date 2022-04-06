import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudishComponent } from './menudish.component';

describe('MenudishComponent', () => {
  let component: MenudishComponent;
  let fixture: ComponentFixture<MenudishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenudishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenudishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
