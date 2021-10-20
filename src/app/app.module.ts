import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {CourseComponent} from './components/course/course.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfcourseComponent } from './pages/profcourse/profcourse.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    CourseComponent,
    CreateCourseComponent,
    CourseItemComponent,
    AssignmentComponent,
    ProfileComponent,
    ProfcourseComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
