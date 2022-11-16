import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglesConditionsComponent } from './regles-conditions.component';

describe('ReglesConditionsComponent', () => {
  let component: ReglesConditionsComponent;
  let fixture: ComponentFixture<ReglesConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglesConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglesConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
