import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacedetectComponent } from './facedetect/facedetect.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccessDoneComponent } from './access-done/access-done.component';

const routes: Routes = [

  {
    path: "", component: FacedetectComponent
  },
  {
    path: "login", component: LoginComponent
  },
  
  {
    path: "signup", component:  SignupComponent
  },
  {
    path: "accessDone", component:  AccessDoneComponent
  }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
