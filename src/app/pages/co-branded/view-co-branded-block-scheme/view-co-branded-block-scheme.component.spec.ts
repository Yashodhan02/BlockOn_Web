import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoBrandedBlockSchemeComponent } from './view-co-branded-block-scheme.component';

describe('ViewCoBrandedBlockSchemeComponent', () => {
  let component: ViewCoBrandedBlockSchemeComponent;
  let fixture: ComponentFixture<ViewCoBrandedBlockSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoBrandedBlockSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoBrandedBlockSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
