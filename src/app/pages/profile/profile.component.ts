import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userdata:any = {
    username:"",
    email:"",
    userID:"",

  }
  newpwmismatch:boolean = false;
  notnewpw:boolean = false;
  changepw:boolean = false;
  editprofile:boolean = false;
  constructor(private userService:UserService) { }
  submitchangepw(data:any){
    console.log(data);
    if(data.currpw==data.newpw1){
      this.notnewpw = true;
      return;
    }
    if(data.newpw1!=data.newpw2){
      this.newpwmismatch = true;
      return;
    }
    this.userService.sendChangePWReq(this.userdata.userID,data).subscribe(data=>{
      console.log(data)
    })

  }
  submiteditprofile(profileData:any){
    console.log(profileData);
    this.userService.setProfileData(this.userdata.userID, profileData).subscribe(data=>{
      console.log(data);
    })
  }
  ngOnInit(): void {
    let id = localStorage.getItem('userid');
    if(id!=null){
      this.userService.getProfileData(id).subscribe(data=>{
        this.userdata = data;
      })
    }

  }

}
