import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEntityComponent } from './payment-entity.component';

describe('PaymentEntityComponent', () => {
  let component: PaymentEntityComponent;
  let fixture: ComponentFixture<PaymentEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
