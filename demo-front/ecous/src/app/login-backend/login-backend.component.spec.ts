import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBackendComponent } from './login-backend.component';

describe('LoginBackendComponent', () => {
  let component: LoginBackendComponent;
  let fixture: ComponentFixture<LoginBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginBackendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
