import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTE } from './constants/app.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: HOME_ROUTE,
    pathMatch: 'full',
  },
  {
    path: HOME_ROUTE,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
