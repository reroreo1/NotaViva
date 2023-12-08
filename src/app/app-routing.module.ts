import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MsalGuard} from "@azure/msal-angular";
import {HomeComponent} from "./components/skelton/home/home.component";
import {NotFoundComponent} from "./components/skelton/not-found/not-found.component";
import {NewNoteComponent} from "./components/frontend/new-note/new-note.component";

const routes: Routes = [

  // Back-office: Administration:
  // { path: 'users', canActivate: [MsalGuard], component: UsersComponent , data: { roles: ['MAINTENANCIER_SYSTEME', 'RESPONSABLE_B4', 'ADMINISTRATEUR_B4']}},


  // Front-office: Maps:
  { path: 'new-note', component: NewNoteComponent, data: { roles: ['STUDENT']} },

  // #############################################################
  // HEADER SECTION:
  // #############################################################

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'profile', canActivate: [MsalGuard], component: ProfileComponent },
  { path: 'auth', canActivate: [MsalGuard], component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
