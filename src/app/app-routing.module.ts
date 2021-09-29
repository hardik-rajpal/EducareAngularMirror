import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CourseComponent } from './course/course.component'
import { CourseItemComponent } from './course-item/course-item.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'courses', component:CourseComponent},
  {path: 'courses/:code', component:CourseItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
