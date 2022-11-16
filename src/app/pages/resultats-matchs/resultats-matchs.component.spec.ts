import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsMatchsComponent } from './resultats-matchs.component';

describe('ResultatsMatchsComponent', () => {
  let component: ResultatsMatchsComponent;
  let fixture: ComponentFixture<ResultatsMatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatsMatchsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatsMatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
