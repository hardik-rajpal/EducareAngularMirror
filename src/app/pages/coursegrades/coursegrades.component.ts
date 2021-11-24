import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-coursegrades',
  templateUrl: './coursegrades.component.html',
  styleUrls: ['./coursegrades.component.css']
})
export class CoursegradesComponent implements OnInit {

  constructor(private taskService:AssignmentService, private route:ActivatedRoute) { }
  data:any[] = []
  ngOnInit(): void {

    let courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('coursecode') || '{}'));
    let userid = localStorage.getItem('userid')!;
    this.taskService.getGradesData(courseid, userid).subscribe(data=>{
      console.log(data)
      this.data = data;
    });
  }

}
