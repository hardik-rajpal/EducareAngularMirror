import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseComponent } from './course/course.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursePostComponent } from './course-post/course-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CourseComponent,
    CourseItemComponent,
    CoursePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
