import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllVotersComponent } from './view-all-voters.component';

describe('ViewAllVotersComponent', () => {
  let component: ViewAllVotersComponent;
  let fixture: ComponentFixture<ViewAllVotersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllVotersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllVotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
