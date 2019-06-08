import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationfindComponent } from './locationfind.component';

describe('LocationfindComponent', () => {
  let component: LocationfindComponent;
  let fixture: ComponentFixture<LocationfindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationfindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationfindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
