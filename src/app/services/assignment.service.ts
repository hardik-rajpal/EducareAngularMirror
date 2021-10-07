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
export class AssignmentService {
  apiroot = "http://127.0.0.1:8000/assignments/"
  constructor(private http:HttpClient) { }
  getAssignmentData(courseid:string, enumL=-1){
    let enumstr = '/'+enumL.toString() + '/';
    if(enumL==-1){
      enumstr = '/all/'
    }
    return this.http.get<any>(this.apiroot+courseid +enumstr,httpop)
  }
  createAssignment(data:any, courseid:string){
    // let enumstr = '/'+enumL.toString()+'/'
    const httpCreateOp = {
      params:new HttpParams().append('assignmentdata',data)
    }
    return this.http.post<any>(this.apiroot + courseid +'/create/', httpCreateOp);
  }
}
