import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
// import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // server_url=environment.server_url;
  @ViewChild('userid') idfield!:ElementRef;
  @ViewChild('password') pwfield!:ElementRef;
  constructor(private userservice:UserService) { }
  sendcreds(){
    let id = this.idfield.nativeElement.value;
    let pw = this.pwfield.nativeElement.value;
    this.userservice.sendAuthData(id, pw).subscribe(data=>{
      console.log(data);
    })
  } 
  ngOnInit(): void {
    this.userservice.getProfileData('200050048').subscribe(data=>{
      console.log(data);
    })
  }

}
