import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BooksListWithSearch } from './books-list-with-search.component';

describe('AllBooksComponent', () => {
  let component: BooksListWithSearch;
  let fixture: ComponentFixture<BooksListWithSearch>;

  beforeEach(async(() => {
    const mockComponents: any[] = [SearchBarMock, SelectionBookMock];

    TestBed.configureTestingModule({
      declarations: [BooksListWithSearch, ...mockComponents],
    })
      .overrideComponent(BooksListWithSearch, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListWithSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Должен быть создан', () => {
    expect(component).toBeTruthy();
  });
});

// tslint:disable
@Component({
  selector: 'bkmrk-books-search-bar',
  template: '',
})
class SearchBarMock {}

@Component({
  selector: 'bkmrk-selection-book-list',
  template: '',
})
class SelectionBookMock {
  @Input()
  public Books: any[];
}
