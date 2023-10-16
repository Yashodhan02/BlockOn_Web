import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlockonSchemeComponent } from './create-blockon-scheme.component';

describe('CreateBlockonSchemeComponent', () => {
  let component: CreateBlockonSchemeComponent;
  let fixture: ComponentFixture<CreateBlockonSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBlockonSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBlockonSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
