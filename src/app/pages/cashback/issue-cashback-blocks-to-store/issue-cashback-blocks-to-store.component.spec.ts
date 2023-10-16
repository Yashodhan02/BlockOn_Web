import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCashbackBlocksToStoreComponent } from './issue-cashback-blocks-to-store.component';

describe('IssueCashbackBlocksToStoreComponent', () => {
  let component: IssueCashbackBlocksToStoreComponent;
  let fixture: ComponentFixture<IssueCashbackBlocksToStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueCashbackBlocksToStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueCashbackBlocksToStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
