import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportStoresComponent } from './export-stores.component';

describe('ExportStoresComponent', () => {
  let component: ExportStoresComponent;
  let fixture: ComponentFixture<ExportStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
