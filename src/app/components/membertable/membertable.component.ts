import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-membertable',
  templateUrl: './membertable.component.html',
  styleUrls: ['./membertable.component.css']
})
export class MembertableComponent implements OnInit {
  @Input('title') title:string="";
  @Input('courseid') courseid:string="";
  @Input('members') members:any[]=[];
  @Input('level') level!:number;
  @Input('memberids') memberids:string[]=[];
  @Output('sendlist') sendlist:EventEmitter<any> = new EventEmitter();
  @ViewChild('newmembers') inputelem!:ElementRef;
  @ViewChild('table') table!:ElementRef;
  editing:boolean = false;
  deflevels:any = {
    'students':0,
    'wizards':1,
    'instructors':4
  }
  fields:any = {
    'students':['User ID', 'Grade', 'Submission'],
    'instructors':['User ID'],
    'wizards':['User ID', 'Access Level']
  }
  constructor() { }
  remove(id:string){
    for(let i =0;i<this.members.length;i++){
      if(this.memberids[i]==id){
        this.members.splice(i,1);
        this.memberids.splice(i, 1);
        // console.log(this.memberids);
        return;
      }
    }
  }
  sendList(){
    this.members.push({'role':this.title.toLowerCase()})
    console.log(this.members)
    this.sendlist.emit(this.members)
    //send list out.
  }
  downloadList(){
    let keys:string[] = []
    let data = []
    let row = this.table.nativeElement.children[0];
    let list = [...row.children];
    for(let cell of list){
      keys.push(cell.textContent)
    }
    console.log(keys)
    for(let i=1;i<this.table.nativeElement.children.length;i++){
      row = this.table.nativeElement.children[i]
      list = [...row.children]
      list.pop()
      let dataobj:any = {}
      for(let j=0;j<list.length;j++){  
        dataobj[keys[j]] = list[j].textContent
      }
      data.push(dataobj);
    }
      console.log(data);
    let textdata = JSON.stringify(data);
    textdata = textdata.split('},{').join('},\n{')
    let blob = new Blob([textdata]);
    FileSaver.saveAs(blob, this.courseid+'_'+this.title.toLowerCase()+".txt")

    // console.log()
  }
  addMembers(){
    let inputstr:string = this.inputelem.nativeElement.value;
    inputstr =  inputstr.replace(' ', '');
    let idlist:string[] = this.inputelem.nativeElement.value.split(',');
    let objlist = [...this.members];
    console.log(idlist);
    for(let item of idlist){
      let element:any = {};
      element[item] = this.deflevels[this.title.toLowerCase()];
      objlist.push(element)
    }
    objlist.push({'role':this.title.toLowerCase()})
    this.sendlist.emit(objlist);
  }
  collectFiles(ev:any){
    console.log(ev);
    let fr = new FileReader();
    fr.onload = ()=>{
      let text = fr.result?.toString();
      if(text!=undefined){
        let data = JSON.parse(text);
        //add processors
      }

    }
    fr.readAsText(ev[0]);

  }
  getLevelbyId(memberid:string){
    return this.members[this.memberids.indexOf(memberid)][memberid]
  }
  changeLevelbyId(memberid:string, delta:number){
    let currlevel = this.members[this.memberids.indexOf(memberid)][memberid];
    if(currlevel<=this.deflevels['instructors']-1 && currlevel >= this.deflevels['students']+1){
      this.members[this.memberids.indexOf(memberid)][memberid] = currlevel + delta
    }

  }
  ngOnInit(): void {
    console.log(this.members)
  }

}
