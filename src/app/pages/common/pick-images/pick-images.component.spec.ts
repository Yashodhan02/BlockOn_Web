import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickImagesComponent } from './pick-images.component';

describe('PickImagesComponent', () => {
  let component: PickImagesComponent;
  let fixture: ComponentFixture<PickImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
