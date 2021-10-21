import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  @Output() sendfiles:EventEmitter<any> = new EventEmitter()
  files:any
  many:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  updateFiles(ev:any){
    this.files = ev.target.files
    if(this.files.length>0){
      if(!this.many){
        this.sendfiles.emit([this.files[0]]);
      }
      else{
        let list = []
        for(let i=0;i<this.files.length;i++){
          list.push(this.files[i]);
        }
        this.sendfiles.emit(list);
      }
    }
  }

}
