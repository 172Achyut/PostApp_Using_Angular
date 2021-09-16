import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes  } from '@angular/router'
import { PostsComponent } from './posts/posts.component';
import { PostformComponent } from './postform/postform.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';



const routes : Routes = [
  {
    path : "",
    component : PostsComponent
    
  },
  {
    path:"addpost",
    component : PostformComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"editPost/:id",
    component : PostformComponent 
  },
  {
    path:"deletePost/:id",
    component : PostsComponent
  },
  {
    path:"register",
    component : RegisterComponent
  },
  {
    path : "login",
    component : LoginComponent
  },
  // {
  //   path:"**",
  //   component : NotfoundComponent
  // }
  
 
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ], 
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }