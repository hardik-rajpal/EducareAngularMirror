import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-profcourse',
  templateUrl: './profcourse.component.html',
  styleUrls: ['./profcourse.component.css']
})
export class ProfcourseComponent implements OnInit {
  courseid!:string
  makingAssignment:boolean = false;
  constructor(private assignmentService:AssignmentService,
    private route:ActivatedRoute) { }
  makeAssignmentData(data:any){
    console.log(data);
    this.assignmentService.createAssignment(data, this.courseid).subscribe(resp=>{
      console.log(resp)
    });
  }
  ngOnInit(): void {
    this.courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('code') || '{}'));
    console.log(this.courseid + "Is the id");
  }

}
