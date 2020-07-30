import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveVoterComponent } from './remove-voter.component';

describe('RemoveVoterComponent', () => {
  let component: RemoveVoterComponent;
  let fixture: ComponentFixture<RemoveVoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveVoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
