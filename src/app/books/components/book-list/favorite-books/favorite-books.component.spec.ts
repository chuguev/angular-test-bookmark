import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { FavoriteBooksComponent } from './favorite-books.component';

describe('FavoriteBooksComponent', () => {
  let component: FavoriteBooksComponent;
  let fixture: ComponentFixture<FavoriteBooksComponent>;

  beforeEach(async(() => {
    const mockComponents: any[] = [SearchBarMock, SelectionBookMock];

    TestBed.configureTestingModule({
      declarations: [FavoriteBooksComponent, ...mockComponents],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteBooksComponent);
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
