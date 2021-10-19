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
  apiroot = "https://educare-django.herokuapp.com/assignments/"
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
  getSubmissionData(courseid:string, enumL:number, userid:string=''){
    if(userid==""){
      userid = 'all'
    }
    let suffix = courseid + '/' + enumL +'/submissions/'+ userid + '/'
    return this.http.get<any>(this.apiroot+suffix,httpop)
  }
  makeSubmission(courseid:string, enumL:number, userid:string, file:any){
    let suffix = courseid + '/' + enumL +'/submissions/'+ userid + '/submit/';

    let fdata = new FormData();
    fdata.append('file', file, file.name);

    let uploadData = new FormData();
    uploadData.append('userid', userid);
    uploadData.append('file', file, file.name);

    return this.http.post<any>(this.apiroot + suffix, uploadData);
  }
}
