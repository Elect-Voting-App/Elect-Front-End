import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCandidatesComponent } from './view-all-candidates.component';

describe('ViewAllCandidatesComponent', () => {
  let component: ViewAllCandidatesComponent;
  let fixture: ComponentFixture<ViewAllCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
