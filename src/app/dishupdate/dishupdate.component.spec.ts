import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishupdateComponent } from './dishupdate.component';

describe('DishupdateComponent', () => {
  let component: DishupdateComponent;
  let fixture: ComponentFixture<DishupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
