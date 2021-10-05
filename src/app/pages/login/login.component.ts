import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router,ActivatedRoute } from '@angular/router';
// import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  wrongPassword:boolean = false;
  userDNE:boolean = false;
  // server_url=environment.server_url;
  @ViewChild('userid') idfield!:ElementRef;
  @ViewChild('password') pwfield!:ElementRef;
  constructor(private userservice:UserService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }
  sendcreds(user_data:any){
    let id = user_data.name;
    let pw = user_data.password;
    this.userservice.sendAuthData(id, pw).subscribe(data=>{
      if(data=='Wrong_Password'){
        this.wrongPassword = true;
        this.userDNE = false;
      }
      else if(data=='User_DNE'){
        this.wrongPassword = false;
        this.userDNE = true;
      }
      else{
        localStorage.setItem('userid', id)
        this.router.navigate(["/dashboard"])
        this.wrongPassword = false;
        this.userDNE = false;
        console.log(data.userID)
      }
    })
  } 
  ngOnInit(): void {
    localStorage.setItem('userid', 'None')
    this.userservice.getProfileData('200050048').subscribe(data=>{
      console.log(data);
    })
  }

}
