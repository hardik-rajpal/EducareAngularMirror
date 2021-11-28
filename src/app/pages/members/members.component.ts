import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  courseid!:string
  accesslevel:number = 0
  members:any={
    students:[],
    instructors:[],
    wizards:[]
  }
  course:any = {
    id:0,
    instructors:[''],
    students:[''],
    courseName:'',
    courseID:'',
    courseCode:'',
  }
  constructor(private courseService:CourseService, private route:ActivatedRoute, private router:Router) { }
  getAccessLevel(userid:string, members:any){
    let concatroles:any[] = []
    for(let role of Object.keys(members)){
      // console.log(role)
      concatroles = concatroles.concat(members[role]['members'])
    }
    // console.log(members)
    console.log(concatroles)
    for(let card of concatroles){
      if(card[userid]!=undefined){
        return card[userid]
      }
    } 
    return -1
  }
  sendEditedList(data:any[]){
    // console.log(data)
    // console.log(data[0][Object.keys(data[0])[0]])
    let roleobj = data.pop()
    // console.log(roleobj['role'])
    this.courseService.sendMemberData(this.courseid, roleobj['userID'], data).subscribe(data=>{
      console.log(data)
      if(data.length>0){
        window.alert('Error. The following IDS are unreal: ' + data.toString())
      }
      // this.members[] data[roleobj['userID']]
      this.courseService.getMemberData(this.courseid).subscribe(d=>{
        this.members = d;
      })
    })
  }
  ngOnInit(): void {
    let id = localStorage.getItem('userid');
    this.courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('coursecode') || '{}'));
    this.courseService.getMemberData(this.courseid).subscribe(data=>{
      console.log(data);
      this.members = data;
      if(id!=null){
        this.accesslevel = this.getAccessLevel(id, this.members);      
        if(this.accesslevel<=0){
          this.router.navigate(['/dashboard'])
          //redirect to dashboard
        }
      }
      else{
        //redirect to login.
      }

    })
  }
}
