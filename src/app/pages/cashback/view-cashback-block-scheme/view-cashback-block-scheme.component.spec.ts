import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCashbackBlockSchemeComponent } from './view-cashback-block-scheme.component';

describe('ViewCashbackBlockSchemeComponent', () => {
  let component: ViewCashbackBlockSchemeComponent;
  let fixture: ComponentFixture<ViewCashbackBlockSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCashbackBlockSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCashbackBlockSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
