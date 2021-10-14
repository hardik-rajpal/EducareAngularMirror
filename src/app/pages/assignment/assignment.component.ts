import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  courseid!:string
  userid!:string
  num!:any
  taskdata={
    number:0,
    title:"",
    instruction:"",
    releaseDate:"",
    dueDate:""
  }
  file:any
  submissiondata = {
    readAssignment:false,
    files:null,
    grade:0,
    time:null,
    feedback:"",
    comments:""
  }
  submitted:boolean = false;
  submitting:boolean=false;
  constructor(private route:ActivatedRoute,
    private assignmentService:AssignmentService) { }
  onChange(event:any){
    this.file = event.target.files[0]
  }
  submitFile(data:any){
      console.log(data.file)
      console.log(this.file)
      this.assignmentService.makeSubmission(this.courseid, this.num, this.userid, this.file).subscribe(data=>{
        console.log(data);
      });
    }
  ngOnInit(): void {
    let courseid, num, id;
    courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('coursecode') || '{}'));
    num =  JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('enum') || '{}'));
    this.courseid = courseid
    this.num = num
    
    console.log(courseid)
    console.log(num)
    this.assignmentService.getAssignmentData(courseid, num).subscribe(data=>{
      console.log(data)
      this.taskdata = data
    })
    id = localStorage.getItem('userid');
    
    if(id!=null){
      this.userid = id;
      this.assignmentService.getSubmissionData(courseid, num, id).subscribe(data=>{
        console.log(data)
        this.submissiondata = data;
        if(this.submissiondata.files!=null){
          this.submitted = true;
        }
      })
    }

  }

}
