import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddURLComponent } from './add-url/add-url.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'addURL', component: AddURLComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
