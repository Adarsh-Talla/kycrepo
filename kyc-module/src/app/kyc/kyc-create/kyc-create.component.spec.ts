import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCreateComponent } from './kyc-create.component';

describe('KycCreateComponent', () => {
  let component: KycCreateComponent;
  let fixture: ComponentFixture<KycCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
