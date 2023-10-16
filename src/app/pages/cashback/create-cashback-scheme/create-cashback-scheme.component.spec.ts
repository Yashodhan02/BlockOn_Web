import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCashbackSchemeComponent } from './create-cashback-scheme.component';

describe('CreateCashbackSchemeComponent', () => {
  let component: CreateCashbackSchemeComponent;
  let fixture: ComponentFixture<CreateCashbackSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCashbackSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCashbackSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
