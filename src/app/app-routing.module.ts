import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './game/create-game/create-game.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'game', component: GameComponent },
    { path: 'game/add', component: CreateGameComponent },
    { path: 'teams', component: TeamComponent },
    { path: 'teams/add', component: CreateTeamComponent },
    { path: 'screen', component: GameComponent },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
