import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseComponent } from '../../components/course/course.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentCourses:any
  instructorCourses:any
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('userid')
    console.log(id)
    if(id!=null){
      this.courseService.getCoursesByStudent(id).subscribe(data=>{
        console.log(data)
        this.studentCourses = data
      })

    }
  }

}
