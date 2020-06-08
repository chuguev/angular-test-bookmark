import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bkmrk-books-search-bar',
  templateUrl: './book-search-bar.component.html',
  styleUrls: ['./book-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSearchBarComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private form: FormGroup;

  @Output()
  public Search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  get Form(): FormGroup {
    return this.form;
  }

  /**
   * Инициализация формы
   */
  public ngOnInit(): void {
    this.initForm();
  }

  /**
   * Отписка
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  /**
   * Инициализация формы поиска
   */
  private initForm(): void {
    this.form = this.fb.group({
      searchTerm: [''],
    });

    this.form
      .get('searchTerm')
      .valueChanges.pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe((searchTerm: string) => {
        this.Search.emit(searchTerm);
      });
  }
}
