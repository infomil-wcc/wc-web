import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassementsComponent } from './pages/classements/classements.component';
import { LesJeuxComponent } from './pages/les-jeux/les-jeux.component';

const routes: Routes = [
  {
    path: "les-jeux", component:LesJeuxComponent
  },
  {
    path: "classements",component:ClassementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
