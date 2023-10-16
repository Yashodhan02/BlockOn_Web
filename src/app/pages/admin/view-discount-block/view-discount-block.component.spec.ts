import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiscountBlockComponent } from './view-discount-block.component';

describe('ViewDiscountBlockComponent', () => {
  let component: ViewDiscountBlockComponent;
  let fixture: ComponentFixture<ViewDiscountBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDiscountBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDiscountBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
