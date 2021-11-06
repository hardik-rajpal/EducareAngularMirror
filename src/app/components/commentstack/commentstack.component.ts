import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-commentstack',
  templateUrl: './commentstack.component.html',
  styleUrls: ['./commentstack.component.css']
})
export class CommentstackComponent implements OnInit {
  @Input('comments') comments:any[]=[];
  @Input('level') level:number = 0;
  commenting:boolean = false;
  constructor() { }
  ngAfterViewInit(){
    console.log(this.comments);
  }
  ngOnInit(): void {
    console.log(this.comments);
    // console.log(this.comments);

  }

}
