import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { PostService } from 'src/app/services/post.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-profcourse',
  templateUrl: './profcourse.component.html',
  styleUrls: ['./profcourse.component.css']
})
export class ProfcourseComponent implements OnInit {
  courseid!:string
  @ViewChild('postForm') postform!:NgForm
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
  makingAssignment:boolean = false;
  makingPost:boolean = false;
  makingAssessment:boolean = false;
  constructor(private assignmentService:AssignmentService,
    private courseService:CourseService,
    private postService:PostService,
    private route:ActivatedRoute,
    private router:Router) { }
  makeAssignmentData(data:any){
    // console.log(data);
    // this.postform.reset()
    this.assignmentService.createAssignment(data, this.courseid).subscribe(resp=>{
      // console.log(resp)
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

}
