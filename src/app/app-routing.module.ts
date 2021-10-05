import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CourseItemComponent} from './components/course-item/course-item.component'
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';
const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'courses/:code', component:CourseItemComponent},
  {path: 'create_course', component:CreateCourseComponent},
  {path: 'assignments/:coursecode/:enum', component:AssignmentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
