import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';

import { BookSearchBarComponent } from './book-search-bar.component';

describe('BookSearchBarComponent', () => {
  const searchBarCss = 'book-search-bar';
  let component: BookSearchBarComponent;
  let fixture: ComponentFixture<BookSearchBarComponent>;

  beforeEach(async(() => {
    const mockComponents: any[] = [MatCardMock, MatLabelMock];

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [BookSearchBarComponent, ...mockComponents],
    })
      .overrideComponent(BookSearchBarComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  it('Должно всплывать событие с поисковым запросом', fakeAsync(() => {
    const outputSpy: jasmine.Spy = spyOn(component.Search, 'emit');
    const searchInputElement: DebugElement = fixture.debugElement.query(By.css(`.${searchBarCss}__search-term`));
    const searchInput: HTMLInputElement = searchInputElement.nativeElement;
    const inputEvent: Event = new Event('input');

    searchInput.value = 'Text';
    searchInput.dispatchEvent(inputEvent);
    tick(300);

    expect(outputSpy).toHaveBeenCalled();
  }));
});

// tslint:disable
@Component({
  selector: 'mat-card',
  template: '<ng-content></ng-content>',
})
class MatCardMock {}

@Component({
  selector: 'mat-label',
  template: '<ng-content></ng-content>',
})
class MatLabelMock {}
