import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesJeuxComponent } from './les-jeux.component';

describe('LesJeuxComponent', () => {
  let component: LesJeuxComponent;
  let fixture: ComponentFixture<LesJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesJeuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
