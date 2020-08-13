import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingHeaderComponent } from './voting-header.component';

describe('VotingHeaderComponent', () => {
  let component: VotingHeaderComponent;
  let fixture: ComponentFixture<VotingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
