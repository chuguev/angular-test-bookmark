import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { AllBooksComponent } from './all-books.component';

describe('AllBooksComponent', () => {
  let component: AllBooksComponent;
  let fixture: ComponentFixture<AllBooksComponent>;

  beforeEach(async(() => {
    const mockComponents: any[] = [SearchBarMock, SelectionBookMock];

    TestBed.configureTestingModule({
      declarations: [AllBooksComponent, ...mockComponents],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBooksComponent);
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
