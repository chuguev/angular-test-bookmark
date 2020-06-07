import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListContainer } from './book-list-container.component';

describe('BookListComponent', () => {
  let component: BookListContainer;
  let fixture: ComponentFixture<BookListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookListContainer],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
