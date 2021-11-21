import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { EventEmitter } from 'stream';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('data') data:any={
    id:0,
    author:"",
    authorid:"",
    datemade:"",
    text:"",
    replies:[]
  }
  @Input('level') level:number = 0;
  @Output() newReply:EventEmitter<any> = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  }

}
