import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PostService} from '../../services/post.service';
@Component({
  selector: 'app-commentstack',
  templateUrl: './commentstack.component.html',
  styleUrls: ['./commentstack.component.css']
})
export class CommentstackComponent implements OnInit {
  @Input('comments') comments:any[]=[];
  @Input('id') commentId:number = -1;
  @Input('level') level:number = 0;
  @Input('postNum') postNum:number = 0;
  courseid:string = ""
  @ViewChild('replybox') replybox!:ElementRef;
  commenting:boolean = false;
  constructor(private postService:PostService, private route:ActivatedRoute) { }
  ngAfterViewInit(){
    console.log(this.comments);
  }
  ngOnInit(): void {
    console.log(this.comments);
    let courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('coursecode') || '{}'));
    this.courseid = courseid;
    // console.log(this.comments);
  }
  addReply(){
    
    console.log(this.replybox.nativeElement.value)
    let id = localStorage.getItem('userid')
    if(id)
    this.commenting = false;
    let data:any = {
      courseid:this.courseid,
      postNum:this.postNum,
      toCommentId:this.commentId,
      text:this.replybox.nativeElement.value,
      authorid:id,
    }
    this.postService.addComment(data,this.courseid,this.postNum).subscribe(data=>{
      console.log(data)
      console.log(this.comments)
      this.comments = data
    })
    // console.log(text)
  }

}
