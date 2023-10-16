import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSettlementReportComponent } from './store-settlement-report.component';

describe('StoreSettlementReportComponent', () => {
  let component: StoreSettlementReportComponent;
  let fixture: ComponentFixture<StoreSettlementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSettlementReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreSettlementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
