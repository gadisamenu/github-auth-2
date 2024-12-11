import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { AuthRoutingModule } from './auth-routing.module';
import { ConnectComponent } from './components/connect/connect.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListInfoComponent } from './components/list-info/list-info.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared.module';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [ConnectComponent, ListInfoComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    MatExpansionModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    SharedModule,
    AgGridAngular,
    AgGridModule,
  ],
})
export class AuthModule {}
