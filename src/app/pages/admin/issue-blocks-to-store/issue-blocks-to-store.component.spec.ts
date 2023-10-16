import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBlocksToStoreComponent } from './issue-blocks-to-store.component';

describe('IssueBlocksToStoreComponent', () => {
  let component: IssueBlocksToStoreComponent;
  let fixture: ComponentFixture<IssueBlocksToStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueBlocksToStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueBlocksToStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
