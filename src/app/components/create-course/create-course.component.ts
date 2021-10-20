import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  @ViewChild('createForm') form!:NgForm;
  @ViewChild('table') table!:ElementRef;
  server_url = environment.server_url;
  users:any[] = [{
    userid:"",
    username:""
  }]
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getProfileData().subscribe(data=>{
      this.users = data
    })
  }
  createcourse(data:any){
    console.log(data)
    //clean data. Remove non-players.
    //send data.
  }
  logical(event:any){
    let opp:any = {
      'stu':'ins',
      'ins':'stu'
    }
    let id = event.target.parentElement.id.split("_")[1];
    let tag = event.target.parentElement.id.split("_")[0];
    // console.log()
    // console.log(this.table.nativeElement.children)
    // console.log('#'+event.target.id.split("_")[0]+'_ins')
    for( let child of this.table.nativeElement.children){
      if(child.id.split("_")[1]===id){
        // console.log('#' +opp[tag]+"_"+id)
        let check1 =child.querySelector('#' + tag+"_"+id).querySelector('input').checked
        let check2 = child.querySelector('#' + opp[tag]+"_"+id  ).querySelector('input').checked 
        // console.log(check1 + check2)
        if(check1==false){return}
        if(check1==check2){
          child.querySelector('#' + opp[tag]+"_"+id  ).querySelector('input').checked = !check2;
        }
          
        }
      }
    
    // console.log()
  }
}
