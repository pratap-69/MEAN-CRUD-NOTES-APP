import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllpostsComponent } from './allposts/allposts.component';
import { CreatepostComponent } from './createpost/createpost.component';


const routes: Routes = [
  { path: '', redirectTo: 'allposts', pathMatch: 'full' },
  { path: 'allposts', component: AllpostsComponent },
  { path: 'create', component: CreatepostComponent },
  { path: 'editpost/:postId', component: CreatepostComponent },
  // { path: 'editpost/:postId', component: CreatepostComponent , data: { detailsPage: true }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
