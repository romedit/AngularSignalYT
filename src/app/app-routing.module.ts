import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard()],
    title: "Home page"
  }, {
    path: "login",
    component: LoginComponent,
    title: "Authentication"
  }, {
    path: "singup",
    component: SignupComponent,
    title: "Registration"
  }, {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard()],
    title: "My account"
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
