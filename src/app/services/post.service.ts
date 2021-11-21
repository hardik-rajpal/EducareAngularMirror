import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const httpop = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}
@Injectable({
  providedIn: 'root'
})
export class PostService {
  // apiroot = "https://educare-django.herokuapp.com/posts/"
  apiroot:string = environment.server_url + '/posts/'
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
  addComment(comment:any, courseid:string,enumL:number){
    const httpCommentOp = {
      params:new HttpParams().append('comment',comment)
    }
    return this.http.post<any>(this.apiroot + courseid+'/'+enumL.toString()+'/comments/', httpCommentOp);
  }
}
