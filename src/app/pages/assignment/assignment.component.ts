import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  data={
    number:0,
    instruction:"",
    releaseDate:"",
    dueDate:""
  }
  constructor(private route:ActivatedRoute,
    private assignmentService:AssignmentService) { }

  ngOnInit(): void {
    let courseid, num;
    courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('coursecode') || '{}'));
    num =  JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('enum') || '{}'));
    console.log(courseid)
    console.log(num)
    this.assignmentService.getAssignmentData(courseid, num).subscribe(data=>{
      console.log(data)
      this.data = data
    })
  }

}
