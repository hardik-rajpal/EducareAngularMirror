import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { PostService } from 'src/app/services/post.service';
import { NgForm } from '@angular/forms';
import {saveAs} from 'file-saver'
import { environment } from 'src/environments/environment';
const MIMETYPE = {
  pdf:'application/pdf',
  zip:'application/zip'
}
@Component({
  selector: 'app-profcourse',
  templateUrl: './profcourse.component.html',
  styleUrls: ['./profcourse.component.css']
})

export class ProfcourseComponent implements OnInit {
  
  courseid!:string
  @ViewChild('postForm') postform!:NgForm
  @ViewChild('assignForm') assignform!:NgForm
  @ViewChild('assessForm') assessform!:NgForm
  @ViewChild('hiddenSender') sender!:ElementRef
  @ViewChild('hiddenGetter') getter!:ElementRef
  @ViewChild('fileName') filename!:ElementRef
  course:any = {
    id:0,
    instructors:[''],
    students:[''],
    courseName:'',
    courseID:'',
    courseCode:'',
  }
  assignments = [
    {
      dueDate: "2021-10-11",
      files: null,
      instruction: "",
      number: 0,
      published: false,
      releaseDate: "",
      title: ""
    }
  ]
  posts = [
    {
      files: null,
      instruction: "",
      number: 1,
      published: false,
      releaseDate: "2021-10-09",
      title: "Vocabularo"
    }
  ]
  filehost:string = environment.server_url
  tasknumtemp!:number
  makingAssignment:boolean = false;
  makingPost:boolean = false;
  makingAssessment:boolean = false;
  tempfileholder:any
  constructor(private assignmentService:AssignmentService,
    private courseService:CourseService,
    private postService:PostService,
    private route:ActivatedRoute,
    private router:Router) { }
  makeAssignmentData(data:any){
    console.log(data)
    console.log(this.tempfileholder)
    
    this.assignmentService.createAssignment(data, this.courseid, this.tempfileholder).subscribe(resp=>{
    this.assignform.reset()
      console.log(resp)
    });
  }
  makePost(data:any){
    this.postform.reset()
    // console.log(data);
    this.postService.createPost(data, this.courseid).subscribe(resp=>{
      // console.log(resp)
    });
    
  }
  ngOnInit(): void {
    this.courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('code') || '{}'));
    this.courseService.getCourseData(this.courseid).subscribe(data=>{
      this.course = data
      // console.log(this.course);
      if(this.course.instructors.includes(localStorage.getItem('userid'))){
        this.assignmentService.getAssignmentData(this.courseid).subscribe(data=>{
          // console.log(data);
          this.assignments = data;
          console.log(this.assignments)
        })
        this.postService.getPostData(this.courseid).subscribe(data=>{
          this.posts = data;
        })
        // console.log("is prof")
      }
      else{
        this.router.navigate(["/dashboard"])
        //user not in instructors list. Redirect to dashboard.
      }
    })
    // console.log(this.courseid + "Is the id");
  }
  collectFiles(files:any){
    console.log(files);
    this.tempfileholder = files[0]
  }
  triggerFileChooser(task_num:number=-1){
    console.log(task_num);
    this.tasknumtemp = task_num;
    this.sender.nativeElement.click()
  }
  submitFeedback(event:any){
    if(this.sender.nativeElement.files.length<1){
      // this.filename.nativeElement.innerHTML = ""
      return
    }
    if(this.tasknumtemp==-1){
      this.tempfileholder = event.target.files[0]
      this.filename.nativeElement.innerHTML += event.target.files[0].name
      return
    }
    this.assignmentService.sendFeedback(this.courseid,this.tasknumtemp, event.target.files[0]).subscribe(data=>{
      console.log(data)
      this.sender.nativeElement.value = null
      // event.target.files = null
    })
  }
  downloadSubmissions(tasknum:number){
    this.assignmentService.getSubmissions(this.courseid, tasknum).subscribe(data=>{
      console.log(data)
      // this.getter.nativeElement.href = this.filehost + data.zippath
      // console.log(this.getter.nativeElement.href)
      // this.getter.nativeElement.click()
    })
  }
}
