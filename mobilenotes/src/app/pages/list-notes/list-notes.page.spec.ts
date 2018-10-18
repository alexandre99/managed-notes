import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotesPage } from './list-notes.page';

describe('ListNotesPage', () => {
  let component: ListNotesPage;
  let fixture: ComponentFixture<ListNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNotesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
