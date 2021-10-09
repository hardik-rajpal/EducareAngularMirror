import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  taskdata={
    number:0,
    title:"",
    instruction:"",
    releaseDate:"",
    dueDate:""
  }
  submissiondata = {
    readAssignment:false,
    files:null,
    grade:0,
    time:null,
    feedback:"",
    comments:""
  }
  constructor(private route:ActivatedRoute,
    private assignmentService:AssignmentService) { }

  ngOnInit(): void {
    let courseid, num, id;
    courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('coursecode') || '{}'));
    num =  JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('enum') || '{}'));
    console.log(courseid)
    console.log(num)
    this.assignmentService.getAssignmentData(courseid, num).subscribe(data=>{
      console.log(data)
      this.taskdata = data
    })
    id = localStorage.getItem('userid');
    if(id!=null){
      this.assignmentService.getSubmissionData(courseid, num, id).subscribe(data=>{
        console.log(data)
        this.submissiondata = data;
      })
    }

  }

}
