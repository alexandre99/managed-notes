import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNotePage } from './register-note.page';

describe('RegisterNotePage', () => {
  let component: RegisterNotePage;
  let fixture: ComponentFixture<RegisterNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
