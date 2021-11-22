import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  maxIndentableDepth = 3;
  @Input('level') level:number = 0;
  @Output() newReply:EventEmitter<any> = new EventEmitter(); 
  @ViewChild('holder') holderdiv!:ElementRef;
  constructor() { }
  ngAfterViewInit(){
    if(this.level<this.maxIndentableDepth){
      this.holderdiv.nativeElement.className = "container";
    }
  }
  ngOnInit(): void {
  }

}
