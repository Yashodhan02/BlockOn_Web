import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoBrandedIssueBlocksToStoreComponent } from './co-branded-issue-blocks-to-store.component';

describe('CoBrandedIssueBlocksToStoreComponent', () => {
  let component: CoBrandedIssueBlocksToStoreComponent;
  let fixture: ComponentFixture<CoBrandedIssueBlocksToStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoBrandedIssueBlocksToStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoBrandedIssueBlocksToStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
