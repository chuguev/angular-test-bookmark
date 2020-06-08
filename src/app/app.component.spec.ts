import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const mockComponents: any[] = [BookListContainerMock];

    TestBed.configureTestingModule({
      declarations: [AppComponent, ...mockComponents],
    }).compileComponents();
  }));

  it('Должен быть создан', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

// tslint:disable
@Component({
  selector: 'bkmrk-book-list-container',
  template: '',
})
class BookListContainerMock {}
