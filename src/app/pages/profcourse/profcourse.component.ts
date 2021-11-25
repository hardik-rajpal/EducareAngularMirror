import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { PostService } from 'src/app/services/post.service';
import { NgForm, NgModelGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UploaderComponent } from 'src/app/components/uploader/uploader.component';
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
  @ViewChild('uploader') uploader!:UploaderComponent
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
      seenby:0,
      submittedby:0,
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
  taskdata:any = {}
  filehost:string = environment.server_url
  tasknumtemp!:number
  releaseTaskNow:boolean = false;
  releasePostNow:boolean = false;
  releaseAssessmentNow:boolean = false;
  datesinvalid:boolean = false;
  makingAssignment:boolean = true;
  editingAssignment:boolean = false;
  makingPost:boolean = false;
  editingPost:boolean = false;
  makingAssessment:boolean = false;
  tempfileholder:any
  accesslevel = 1;
  constructor(private assignmentService:AssignmentService,
    private courseService:CourseService,
    private postService:PostService,
    private route:ActivatedRoute,
    private router:Router) { }
    makeAssignmentData(data:any){
      let dupdata = {...data};
      console.log(this.tempfileholder)
      console.log(dupdata)
      dupdata['releaseDate']+=('T'+data['releaseTime']+':00')
      dupdata['dueDate']+=('T'+data['dueTime']+':00')  
      if(this.editingAssignment){
        console.log(dupdata.releaseDate)
        this.assignmentService.updateAssignment(dupdata, this.courseid,this.taskdata.number).subscribe(data=>{
          console.log(data)
          // this.assignform.reset()
          this.releaseTaskNow = false;
          // this.uploader.files = []
          window.alert("Successfully saved your changes!")
        },error=>{
          window.alert("Error. Please check the changes you've made.")
        });
    
      }
      else{
        this.assignmentService.createAssignment(dupdata, this.courseid, this.tempfileholder).subscribe(resp=>{
          this.assignform.reset()
          this.releaseTaskNow = false;
          this.uploader.files = []
          window.alert("Successfully Made Assignment!")
        }, error=>{
          window.alert("Error. Please check the form.");
        });
      }

  }
  validateDates(form:NgForm){
    let today = new Date;
    let reltime = form.value.releaseTime;
    let releaseDate = form.value.releaseDate;
    if(!this.releaseTaskNow){
      if(!(releaseDate=="")){
        let rdate = new Date(releaseDate+'T'+reltime +':00');
        console.log(releaseDate+'T'+reltime +':00')
        if(rdate.valueOf()<today.valueOf()){
          this.datesinvalid = true;
          return;
        }
      }
    }
    if(form!=this.postform){
      let duetime = form.value.dueTime;
      let dueDate = form.value.dueDate;
      if(!(dueDate=="")){
        let ddate = new Date(dueDate+'T'+duetime+':00');
        if(ddate<today){
          this.datesinvalid = true;
          return;
        }
        if(!(releaseDate=="")){
          let rdate = new Date(releaseDate +'T'+reltime+':00');
          if(ddate.valueOf()<=rdate.valueOf()){
            this.datesinvalid = true;
            return;
          }
        }
      }
    }

    
    this.datesinvalid = false;
  }
  markAsGraded(tasknumber:number){
    let updateData = {
      releaseGrades:true
    }
    this.assignmentService.updateAssignment(updateData, this.courseid, tasknumber).subscribe(data=>{
      console.log(data)
    });
  }
  loadFormToEdit(tasknumber:number,form:NgForm){
    if(form==this.assignform){
      this.taskdata['number'] = tasknumber
      this.makingAssessment = false;this.editingAssignment=true;this.makingPost = false;
      this.assignmentService.getAssignmentData(this.courseid, tasknumber, true).subscribe(data=>{
        data.releaseTaskNow = false;
        delete data.number
        delete data.published
        console.log({...data})
        if(data.files!=""){
          // this.uploader.names = [data.files.split('/')[data.files.split('/').length-1]]
          delete data.files
        }
        delete data.graded
        delete data.acceptSubmission
        console.log(data.releaseDate)
        let temparray:any[] = data.releaseTime.split(':')
        temparray.pop()
        
        data.releaseTime = [...temparray].join(':')
        temparray = data.dueTime.split(':')
        temparray.pop()
        data.dueTime =[...temparray].join(':')
        
        form.setValue(data);
      })
    }
    else if(form==this.postform){
      this.makingAssessment = false;this.makingAssignment=true;this.makingPost = false;
      this.postService.getPostData(this.courseid, tasknumber, 'instructor').subscribe(data=>{
        console.log(data)
      })
    }
    }

  makePost(data:any){
    
    // console.log(data);
    this.postService.createPost(data, this.courseid,this.tempfileholder).subscribe(resp=>{
      this.releasePostNow = false;
      this.uploader.files = []
      window.alert("Successfully Made Assignment!")
      this.postform.reset()
    }, error=>{
      window.alert("Error. Please check the form.");
    });
    
  }
  ngOnInit(): void {
    this.courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('code') || '{}'));
    this.courseService.getCourseData(this.courseid).subscribe(data=>{
      this.course = data
      let userid = localStorage.getItem('userid');
      if(userid!=null){
        let iswiz = this.course.wizardcards.filter((v:any)=>{console.log(Object.keys(v)[0]);return Object.keys(v)[0]==userid}).length>0;
        this.course.wizardcards.forEach((v:any)=>{console.log(Object.keys(v))})
        console.log([userid])
        console.log(this.course.wizardcards.filter((v:any)=>{Object.keys(v)==[userid]}))
        let allowed = iswiz||this.course.instructors.includes(userid);
        if(allowed){
          this.assignmentService.getAssignmentData(this.courseid).subscribe(data=>{
            this.assignments = data;
            console.log(this.assignments)
          })
          this.postService.getPostData(this.courseid,-1,'instructor').subscribe(data=>{
            this.posts = data;
          })
          // console.log("is prof")
          if(iswiz){
            this.accesslevel = this.course.wizardcards.filter((v:any)=>{return Object.keys(v)[0]==userid})[0][userid];
            // console.log(this.accesslevel)
          }
          else{
            this.accesslevel = 4;  
          }
        }
        else{
          this.router.navigate(["/dashboard"])
          //user not in instructors list. Redirect to dashboard.
        }
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
    console.log("Called");
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
      this.getter.nativeElement.href = this.filehost + data.zippath
      console.log(this.getter.nativeElement.href)
      this.getter.nativeElement.click()
    })
  }
}
