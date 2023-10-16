import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbackBlockRequestsComponent } from './cashback-block-requests.component';

describe('CashbackBlockRequestsComponent', () => {
  let component: CashbackBlockRequestsComponent;
  let fixture: ComponentFixture<CashbackBlockRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbackBlockRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashbackBlockRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
