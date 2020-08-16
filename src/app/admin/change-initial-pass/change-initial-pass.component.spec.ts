import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInitialPassComponent } from './change-initial-pass.component';

describe('ChangeInitialPassComponent', () => {
  let component: ChangeInitialPassComponent;
  let fixture: ComponentFixture<ChangeInitialPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeInitialPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInitialPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
