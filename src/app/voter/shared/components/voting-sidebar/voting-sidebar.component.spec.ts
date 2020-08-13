import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingSidebarComponent } from './voting-sidebar.component';

describe('VotingSidebarComponent', () => {
  let component: VotingSidebarComponent;
  let fixture: ComponentFixture<VotingSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
