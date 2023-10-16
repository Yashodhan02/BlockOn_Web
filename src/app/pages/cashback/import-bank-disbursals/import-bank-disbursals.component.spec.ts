import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBankDisbursalsComponent } from './import-bank-disbursals.component';

describe('ImportBankDisbursalsComponent', () => {
  let component: ImportBankDisbursalsComponent;
  let fixture: ComponentFixture<ImportBankDisbursalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBankDisbursalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportBankDisbursalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
