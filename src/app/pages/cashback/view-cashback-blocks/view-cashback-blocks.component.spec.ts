import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCashbackBlocksComponent } from './view-cashback-blocks.component';

describe('ViewCashbackBlocksComponent', () => {
  let component: ViewCashbackBlocksComponent;
  let fixture: ComponentFixture<ViewCashbackBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCashbackBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCashbackBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
