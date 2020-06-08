import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListContainer } from './book-list-container.component';
import { Component } from '@angular/core';

describe('BookListComponent', () => {
  let component: BookListContainer;
  let fixture: ComponentFixture<BookListContainer>;

  beforeEach(async(() => {
    const mockComponents: any[] = [MatTabGroupMock, MatTabMock, AllBooksMock, FavoriteBooksMock];

    TestBed.configureTestingModule({
      declarations: [BookListContainer, ...mockComponents],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Должен быть создан', () => {
    expect(component).toBeTruthy();
  });
});

// tslint:disable
@Component({
  selector: 'mat-tab-group',
  template: '<ng-content></ng-content>',
})
class MatTabGroupMock {}

@Component({
  selector: 'mat-tab',
  template: '<ng-content></ng-content>',
})
class MatTabMock {}

@Component({
  selector: 'bkmrk-all-books',
  template: '',
})
class AllBooksMock {}

@Component({
  selector: 'bkmrk-favorite-books',
  template: '',
})
class FavoriteBooksMock {}
