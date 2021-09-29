import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenVerifyComponent } from './token-verify.component';

describe('TokenVerifyComponent', () => {
  let component: TokenVerifyComponent;
  let fixture: ComponentFixture<TokenVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
