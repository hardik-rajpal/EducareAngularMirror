import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CourseItemComponent} from './components/course-item/course-item.component'
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { ProfileComponent } from './pages/profile/profile.component';
const routes: Routes = [
  {path: 'login',component:LoginComponent, data:{logout:false}},
  {path: 'logout', component:LoginComponent, data:{logout:true}},
  {path: 'signup',component:SignupComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'courses/:code', component:CourseItemComponent},
  {path: 'create_course', component:CreateCourseComponent},
  {path: 'assignments/:coursecode/:enum', component:AssignmentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  authorize(){
    console.log("i did oth")
  }
}
