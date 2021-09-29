import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Course } from "./Course"

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses : Course[];

  constructor (
    private router:Router
  ) {

    this.courses = [
      {
        code : "CS251",
        name : "Software Systems Lab",
      },
      {
        code : "CS213",
        name : "Data Structures and Algorithms",
      }
    ]

  }

  onclick() {
    this.router.navigate(['/123'])
  }

  ngOnInit(): void {
  }

}
