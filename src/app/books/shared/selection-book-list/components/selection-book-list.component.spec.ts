import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SelectionBookListComponent } from './selection-book-list.component';
import { SelectionBook } from '../types/selection-book-list.type';

describe('SelectionBookListComponent', () => {
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
      expect(component.Books).toEqual([]);
    });

    it('По умолчанию должно быть выведено сообщение об ошибке', () => {
      const expectedMessage: DebugElement = fixture.debugElement.query(By.css(`.${selectionListCss}__error-message`));
      expect(expectedMessage).not.toBeNull();
    });
  });

  describe('Отображение с переданным набором элементов', () => {
    beforeEach(() => {
      component.Books = itemsMock;
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
      component.Books = [];
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
      component.Books = itemsMock;
      fixture.detectChanges();
    });

    it('Метод #selectBook должен поднимать событие с выбранной книгой', () => {
      const expectedBook: SelectionBook = Object.assign({}, selectedBookMock);
      const outputEvent: jasmine.Spy = spyOn(component.Select, 'emit');

      component.selectBook(expectedBook);

      expect(outputEvent).toHaveBeenCalled();
    });

    it('Метод #selectBook должен изменять состояние выбранной книги', () => {
      const expectedBook: SelectionBook = Object.assign({}, selectedBookMock);

      component.selectBook(expectedBook);

      expect(expectedBook.selected).toBeFalsy();
    });

    it('Должны быть выведены заголовки', () => {
      const expectedTitles: DebugElement[] = fixture.debugElement.queryAll(By.css(`.${bookCss}__title`));

      expect(expectedTitles.length).toBe(itemsMock.length);
    });

    it('Должны быть выведены описания при их наличии', () => {
      const expectedDescriptions: DebugElement[] = fixture.debugElement.queryAll(By.css(`.${bookCss}__description`));
      const booksWithDescriptions: SelectionBook[] = itemsMock.filter(book => book.description);

      expect(expectedDescriptions.length).toBe(booksWithDescriptions.length);
    });

    it('Должны быть выведены изображения книги при их наличии', () => {
      const expectedThumbnail: DebugElement[] = fixture.debugElement.queryAll(By.css(`.${bookCss}__thumbnail`));
      const booksWithThumbnail: SelectionBook[] = itemsMock.filter(book => book.thumbnail);

      expect(expectedThumbnail.length).toBe(booksWithThumbnail.length);
    });

    it('Если книги ЯВЛЯЕТСЯ выбранной то иконка звездочки должна иметь цвет #primary', () => {
      component.Books = [selectedBookMock];
      fixture.detectChanges();

      const expectedIcon: DebugElement = fixture.debugElement.query(By.css(`.${bookCss}__star`));

      expect((expectedIcon.componentInstance as MatIconMock).color).toBe('primary');
    });

    it('Если книги НЕ является выбранной то иконка звездочки должна иметь цвет #accent', () => {
      component.Books = [unselectedBookMock];
      fixture.detectChanges();

      const expectedIcon: DebugElement = fixture.debugElement.query(By.css(`.${bookCss}__star`));
      expect((expectedIcon.componentInstance as MatIconMock).color).toBe('accent');
    });
  });
});

const selectedBookMock: SelectionBook = {
  id: 'Id #1',
  title: 'Title #1',
  description: 'Desc #1',
  thumbnail: 'https://angular.io/assets/images/logos/angular/angular.svg',
  selected: true,
};

const unselectedBookMock: SelectionBook = {
  id: 'Id #2',
  title: 'Title #2',
  description: 'Desc #2',
  thumbnail: 'https://angular.io/assets/images/logos/angular/angular.svg',
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

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-list',
  template: '<ng-content></ng-content>',
})
class MatListMock {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-list-item',
  template: '<ng-content></ng-content>',
})
class MatListItemMock {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-icon',
  template: '<ng-content></ng-content>',
})
class MatIconMock {
  @Input()
  color: any;
}
