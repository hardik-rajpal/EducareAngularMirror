import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CourseItem } from '../course-item/CourseItem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  server_url=environment.server_url;

  courses : CourseItem[];

  constructor (
    private router:Router
  ) {

    this.courses = [
      {
        code: "CS251",
        name: "Software Systems Lab",
        posts: [],
      },
      {
        code: "CS213",
        name: "Data Structures and Algorithms",
        posts: [],
      }
    ]

  }

  ngOnInit(): void {
  }

  showForm = false;
  value = "Create a new Course";

  createCourse() {
    this.showForm = !this.showForm;
    if (this.value == "Create a new Course") {
      this.value = "Hide form";
    }
    else {
      this.value = "Create a new Course";
    }
  }

}
