import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrcidListComponent } from './orcid-list/orcid-list.component';
import { OrcidDetailComponent } from './orcid-detail/orcid-detail.component';

const routes: Routes = [
  { path: 'orcid-detail/:id', component: OrcidDetailComponent },
  { path: 'orcid-list', component: OrcidListComponent },
  { path: '**', component: OrcidListComponent, pathMatch: 'full' }
];

@NgModule({
  /**
   * It's necessary to deploy the project in production
   * and obtain the assets and the index.html
   */
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }