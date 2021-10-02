import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpop = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiroot:string = 'http://127.0.0.1:8000/users/';
  constructor(private http:HttpClient) {}
  getProfileData(userid:string){
    return this.http.get<any>(this.apiroot + userid+'/', httpop)
  }
  sendAuthData(userid:string, password:string){
    const authHttpOp = {
      params:new HttpParams().append('userid', userid).append('password',password)
    }
    return this.http.get<any>(this.apiroot+"auth/", authHttpOp)
  }
}
