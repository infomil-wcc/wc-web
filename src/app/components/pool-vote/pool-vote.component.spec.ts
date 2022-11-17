import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolVoteComponent } from './pool-vote.component';

describe('PoolVoteComponent', () => {
  let component: PoolVoteComponent;
  let fixture: ComponentFixture<PoolVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolVoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
