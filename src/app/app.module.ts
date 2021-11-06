import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TagInputComponent, TagInputModule } from 'ngx-chips';
import {MatChipsModule} from '@angular/material/chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { DownloaderComponent } from './components/downloader/downloader.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { CommentstackComponent } from './components/commentstack/commentstack.component';
import { PostComponent } from './pages/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
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
    ProfcourseComponent,
    AssignmentComponent,
    PostComponent,
    ProfileComponent,
    DownloaderComponent,
    UploaderComponent,
    CommentstackComponent,
    CommentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
