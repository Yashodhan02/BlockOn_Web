import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlockSchemeComponent } from './view-block-scheme.component';

describe('ViewBlockSchemeComponent', () => {
  let component: ViewBlockSchemeComponent;
  let fixture: ComponentFixture<ViewBlockSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBlockSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBlockSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
