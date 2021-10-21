import { Injectable, ɵresetJitOptions } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
const httpop = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  // apiroot = "https://educare-django.herokuapp.com/assignments/"
  apiroot = environment.server_url + '/assignments/'
  constructor(private http:HttpClient) { }
  getAssignmentData(courseid:string, enumL=-1){
    let enumstr = '/'+enumL.toString() + '/';
    if(enumL==-1){
      enumstr = '/all/'
    }
    return this.http.get<any>(this.apiroot+courseid +enumstr,httpop)
  }
  createAssignment(data:any, courseid:string, file:any=null){
    // let enumstr = '/'+enumL.toString()+'/'
    console.log("Here")
    let uploadData = new FormData();
    uploadData.append('data', JSON.stringify(data))
    if(file!=null){
      uploadData.append('file', file, file.name);
    }

    // console.log(uploadData)
    // return
    return this.http.post<any>(this.apiroot + courseid +'/create/',uploadData);
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
    let uploadData = new FormData();
    uploadData.append('userid', userid);
    uploadData.append('file', file, file.name);

    return this.http.post<any>(this.apiroot + suffix, uploadData);
  }
  sendFeedback(courseid: string, enumL:number, file:any){
    let suffix = courseid + '/' + enumL +'/submissions/feedback/upload/';
    let uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post<any>(this.apiroot + suffix, uploadData);
  }
  getSubmissions(courseid:string, enumL:number){
    let suffix = courseid + '/' + enumL +'/submissions/all/';
    return this.http.get<any>(this.apiroot + suffix, httpop);
  }

}
