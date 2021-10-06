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
export class CourseService {
  apiroot = 'http://127.0.0.1:8000/courses/'
  constructor(private http:HttpClient) { }
  getCoursesByStudent(userid:string){
    return this.http.get<any>(this.apiroot+'byuser/False/' + userid +'/', httpop)
  }
  getCoursesByInstructor(userid:string){
    return this.http.get<any>(this.apiroot+'byuser/True/' + userid +'/', httpop)
  }
  getCourseData(courseid:string){
    return this.http.get<any>(this.apiroot+courseid+'/', httpop)
  }

}
