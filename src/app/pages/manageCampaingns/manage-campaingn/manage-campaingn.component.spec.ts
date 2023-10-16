import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCampaingnComponent } from './manage-campaingn.component';

describe('ManageCampaingnComponent', () => {
  let component: ManageCampaingnComponent;
  let fixture: ComponentFixture<ManageCampaingnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCampaingnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCampaingnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
