import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTricheComponent } from './popup-triche.component';

describe('PopupTricheComponent', () => {
  let component: PopupTricheComponent;
  let fixture: ComponentFixture<PopupTricheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTricheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTricheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
