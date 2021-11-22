import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/course.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  items:any[] = []
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('userid')
    this.courseService.getToDo(id!).subscribe(data=>{
      console.log(data)
    })
  }

}
