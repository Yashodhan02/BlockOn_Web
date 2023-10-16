import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoBrandedReportComponent } from './view-co-branded-report.component';

describe('ViewCoBrandedReportComponent', () => {
  let component: ViewCoBrandedReportComponent;
  let fixture: ComponentFixture<ViewCoBrandedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoBrandedReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoBrandedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
