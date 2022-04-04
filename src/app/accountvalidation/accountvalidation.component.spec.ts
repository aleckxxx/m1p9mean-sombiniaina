import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountvalidationComponent } from './accountvalidation.component';

describe('AccountvalidationComponent', () => {
  let component: AccountvalidationComponent;
  let fixture: ComponentFixture<AccountvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountvalidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
