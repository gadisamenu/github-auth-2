import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([]),
    AgGridAngular,
    AgGridModule,
  ],
  providers: [provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
