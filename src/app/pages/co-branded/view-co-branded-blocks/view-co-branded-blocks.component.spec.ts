import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoBrandedBlocksComponent } from './view-co-branded-blocks.component';

describe('ViewCoBrandedBlocksComponent', () => {
  let component: ViewCoBrandedBlocksComponent;
  let fixture: ComponentFixture<ViewCoBrandedBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoBrandedBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoBrandedBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
