import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleCashbackRequestsComponent } from './settle-cashback-requests.component';

describe('SettleCashbackRequestsComponent', () => {
  let component: SettleCashbackRequestsComponent;
  let fixture: ComponentFixture<SettleCashbackRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettleCashbackRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettleCashbackRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
