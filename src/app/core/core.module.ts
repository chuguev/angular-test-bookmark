import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BooksModule } from '../books/books.module';

const featureModules: any[] = [BooksModule];

/**
 * Модуль с подключением основных зависимостей
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, BrowserAnimationsModule, ...featureModules],
  exports: [...featureModules],
})
export class CoreModule {}
