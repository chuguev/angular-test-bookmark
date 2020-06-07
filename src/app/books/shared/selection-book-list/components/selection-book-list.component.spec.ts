import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SelectionBookListComponent } from './selection-book-list.component';
import { SelectionBook } from '../types/selection-book-list.type';

fdescribe('SelectionBookListComponent', () => {
  let component: SelectionBookListComponent;
  let fixture: ComponentFixture<SelectionBookListComponent>;
  const selectionListCss = 'selection-book-list';
  const bookCss = 'book';

  beforeEach(async(() => {
    const componentsMock: any[] = [MatListMock, MatListItemMock, MatIconMock];

    TestBed.configureTestingModule({
      declarations: [SelectionBookListComponent, ...componentsMock],
    })
      .overrideComponent(SelectionBookListComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  describe('Значения по умолчанию', () => {
    it('По умолчанию список должен быть пуст', () => {
      expect(component.Items).toEqual([]);
    });

    it('По умолчанию должно быть выведено сообщение об ошибке', () => {
      const expectedMessage: DebugElement = fixture.debugElement.query(By.css(`.${selectionListCss}__error-message`));
      expect(expectedMessage).not.toBeNull();
    });
  });

  describe('Отображение с переданным набором элементов', () => {
    beforeEach(() => {
      component.Items = itemsMock;
      fixture.detectChanges();
    });

    it('Должны быть выведены все элементы', () => {
      const expectedItems: DebugElement[] = fixture.debugElement.queryAll(By.css(`.${bookCss}`));
      expect(expectedItems.length).toBe(itemsMock.length);
    });

    it('Значение IsEmptyList должно быть FALSE', () => {
      expect(component.IsEmptyList).toBeFalsy();
    });
  });

  describe('Отображение с пустым списком элементов', () => {
    beforeEach(() => {
      component.Items = [];
      fixture.detectChanges();
    });

    it('Значение IsEmptyList должно быть TRUE', () => {
      expect(component.IsEmptyList).toBeTruthy();
    });

    it('Должно быть выведено сообщение о пустом списке', () => {
      const expectedMessage: DebugElement = fixture.debugElement.query(By.css(`.${selectionListCss}__error-message`));
      expect(expectedMessage).not.toBeNull();
    });
  });

  describe('Обработка элемента списка', () => {
    beforeEach(() => {
      component.Items = itemsMock;
      fixture.detectChanges();
    });

    it('Значение #selected должно быть изменено на противоположное при вызове метода #selectBook', () => {
      const expectedBook: SelectionBook = Object.assign({}, selectedBookMock);

      component.selectBook(expectedBook);

      expect(expectedBook.selected).toBeFalsy();
    });
  });
});

const selectedBookMock: SelectionBook = {
  id: 'Id #1',
  title: 'Title #1',
  description: 'Desc #1',
  thumbnail: 'src #1',
  selected: true,
};

const unselectedBookMock: SelectionBook = {
  id: 'Id #2',
  title: 'Title #2',
  description: 'Desc #2',
  thumbnail: 'src #2',
  selected: false,
};

const bookWithoutDescriptionMock: SelectionBook = {
  id: 'Id #3',
  title: 'Title #3',
  selected: false,
};

const bookWithoutThumbnailMock: SelectionBook = {
  id: 'Id #4',
  title: 'Title #4',
  description: 'Desc #4',
  selected: false,
};

const itemsMock: SelectionBook[] = [selectedBookMock, unselectedBookMock, bookWithoutDescriptionMock, bookWithoutThumbnailMock];

// tslint:disable
@Component({
  selector: 'mat-list',
  template: '<ng-content></ng-content>',
})
class MatListMock {}

@Component({
  selector: 'mat-list-item',
  template: '<ng-content></ng-content>',
})
class MatListItemMock {}

@Component({
  selector: 'mat-icon',
  template: '<ng-content></ng-content>',
})
class MatIconMock {}
