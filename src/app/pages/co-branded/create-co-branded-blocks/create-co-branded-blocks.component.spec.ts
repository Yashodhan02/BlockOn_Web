import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoBrandedBlocksComponent } from './create-co-branded-blocks.component';

describe('CreateCoBrandedBlocksComponent', () => {
  let component: CreateCoBrandedBlocksComponent;
  let fixture: ComponentFixture<CreateCoBrandedBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCoBrandedBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCoBrandedBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
