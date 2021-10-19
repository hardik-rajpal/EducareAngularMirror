import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
const httpop = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}
@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiroot = "https://educare-django.herokuapp.com/posts/"
  constructor(private http:HttpClient) { }
  getPostData(courseid:string, enumL=-1){
    let enumstr = '/'+enumL.toString() + '/';
    if(enumL==-1){
      enumstr = '/all/'
    }
    return this.http.get<any>(this.apiroot+courseid +enumstr,httpop)
  }
  createPost(data:any, courseid:string){
    // let enumstr = '/'+enumL.toString()+'/'
    const httpCreateOp = {
      params:new HttpParams().append('postdata',data)
    }
    return this.http.post<any>(this.apiroot + courseid +'/create/', httpCreateOp);
  }
}
