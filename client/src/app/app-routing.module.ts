import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotfoundComponent } from './errors/notfound/notfound.component';
import { ServererrorComponent } from './errors/servererror/servererror.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      {path:'members',component:MemberListComponent},

      {path:'members/:username',component:MemberDetailComponent},
      {path:'member/edit',component:MemberEditComponent,canDeactivate:[preventUnsavedChangesGuard]},
    
      {path:'lists',component:ListsComponent},
    
      {path:'messages',component:MessagesComponent}
    ]
  },

  {path:'errors',component:TestErrorsComponent},

  {path:'not-found',component:NotfoundComponent},
  {path:'server-error',component:ServererrorComponent},
  {path:'**',component:NotfoundComponent, pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
