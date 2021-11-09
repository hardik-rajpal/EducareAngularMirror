import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {CourseService} from 'src/app/services/course.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  @ViewChild('createForm') form!:NgForm;
  constructor(private userService:UserService, private courseService:CourseService) { }
  userid!:string
  userlist!:any[]
  courselist!:any[]
  years=[1999]
  configdata:any={};
  courseExists:boolean = false;
  sems = ["Semester 1", "Semester 2"]
  ngOnInit(): void {
    let id = localStorage.getItem("userid");
    if(id!=null){
      this.userid = id;
    }
    else{
      //redirect
    }
    // this.userService.getProfileData("all").subscribe((userlist)=>{
    //   this.userlist = userlist;
    // })
    this.courseService.getCourseData("all").subscribe((courselist)=>{
      this.courselist = courselist;
    })
    let date = new Date()
    this.years = [date.getFullYear()];
    this.years.push(this.years[this.years.length-1]+1);
  }
  getCourseID(data:any){
    return data.code + 'y'+data.year.toString()+'s'+data.sem.split(' ')[1];
  }
  createcourse(data:any){
    let courseid = this.getCourseID(data)
    for(let course of this.courselist){
      if(course.courseID==courseid){
        this.courseExists = true;
        return;
      }
    }
    data.courseID = courseid;
    if(this.validatekeys(this.configdata)){
      data.roles = this.configdata;
    }
    console.log(data);
    this.courseService.createCourse(data).subscribe(dataa=>{
      console.log(dataa);
    });
    //clean data. Remove non-players.
    //send data.
  }
  validatekeys(data:any){
    let keys = Object.keys(data);
    return (keys.includes("instructors")&&keys.includes("wizards")&&keys.includes("students"));
    // console.log();
  }
  validateIntersect(data:any){
    let keys = Object.keys(data);
    let arrconcat:string[] = [];
    for(let key of keys){
      arrconcat = arrconcat.concat(data[key]);
    }
    for(let ele of arrconcat){
      if(arrconcat.filter(e=>e==ele).length>1){
        return false;
      }
    }
    return true;
  }
  validateUserExistence(data:any){
    let keys = Object.keys(data);
    let arrconcat:string[] = [];
    for(let key of keys){
      arrconcat = arrconcat.concat(data[key]);
    }
    for(let userid of arrconcat){
      if(this.userlist.find(obj=>obj.userID==userid)==undefined){
        return false;
      }
    }
    return true;
  }
  validate(data:any){
    console.log(this.form.value);
    if(this.validatekeys(data)){
      if(data.instructors.includes(this.userid)){
        if(this.validateIntersect(data)){
          if(this.validateUserExistence(data)){
            return true;
          }
          else{
            //report;
          }
        }
        else{
          // report
        }
      }
      else{
        //report
      }

    }
    else{
      //report alert
      console.log("Invalid keys");
    }
  return false;
  }
  collectFiles(ev:any){
    console.log(ev);
    let fr = new FileReader();
    fr.onload = ()=>{
      let text = fr.result?.toString();
      if(text!=undefined){
        let data = JSON.parse(text);
        if(this.validate(data)){
          this.configdata = data
        }
      }

    }
    fr.readAsText(ev[0]);

  }
}
