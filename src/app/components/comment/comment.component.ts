import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentstackComponent } from '../commentstack/commentstack.component';
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
  @Input('disabled') disabled:boolean = false;
  @Output() newReply:EventEmitter<any> = new EventEmitter(); 
  @ViewChild('holder') holderdiv!:ElementRef;
  @ViewChild('stack') stack!:CommentstackComponent;
  commenting = false;
  constructor() { }
  ngAfterViewInit(){
    if(this.level<this.maxIndentableDepth){
      this.holderdiv.nativeElement.className = "container";
    }
  }
  toggleReplyButton(){
    this.stack.replyable = !this.stack.replyable;
  }
  ngOnInit(): void {
  }

}
