import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('data') data:any={
    username:"",
    userid:"",
    datetime:"",
    content:"",
    replies:[]
  }
  @Input('level') level:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
