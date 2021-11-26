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
  @Input('data') data = {
    'members':[
      {'userID':''}
    ],
    'memberdata':[
      {'userID':'1',
        'username':'un'}
    ]
  };
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
    for(let i =0;i<this.data['members'].length;i++){
      if(this.data['memberdata'][i]['userID']==id){
        this.data.members.splice(i,1);
        this.data.memberdata.splice(i, 1);
        // console.log(this.memberids);
        return;
      }
    }
  }
  sendList(){
    this.data.members.push({'userID':this.title.toLowerCase()})
    console.log(this.data.members)
    this.sendlist.emit(this.data.members)
    //send list out.
  }
  downloadList(){
    console.log(this.data)
    let data = [...this.data.members]
    console.log(data)
    let textdata = JSON.stringify(data);
    textdata = textdata.split('},{').join('},\n{')
    let blob = new Blob([textdata]);
    // FileSaver.saveAs(blob, this.courseid+'_'+this.title.toLowerCase()+".txt")

    // console.log()
  }
  getKeys(data:any[]){
    console.log(data)

    let keys:string[] = [];
    for(let card of data){
      keys.push(Object.keys(card)[0])
    }
    return keys
  }

  addMembers(){
    let inputstr:string = this.inputelem.nativeElement.value;
    inputstr =  inputstr.replace(' ', '');
    let idlist:string[] = this.inputelem.nativeElement.value.split(',');
    let objlist = [...this.data.members];
    console.log(idlist);
    for(let item of idlist){
      let element:any = {};
      element[item] = this.deflevels[this.title.toLowerCase()];
      objlist.push(element)
    }
    objlist.push({'userID':this.title.toLowerCase()})
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
  getLevelbyId(memberdatum:any){
    let id = memberdatum['userID']
    let obj:any = this.data.members.find(v=>Object.keys(v)[0]==id)
    return obj[id]
    // console.log()
    // console.log([memberdatum['userID']])
  }
  changeLevelbyId(memberid:string, delta:number){
    let obj:any = this.data.members.find(v=>Object.keys(v)[0]==memberid);
    let currlevel = obj[memberid]
    if(currlevel<this.deflevels['instructors']-1 && delta>0){
     obj[memberid] += delta
      // this.data(memberid)] = {memberid:currlevel + delta}
    }
    if(currlevel > this.deflevels['students']+1 && delta<0){
      obj[memberid]+=delta
    }

  }
  // ngAfterViewInit(){
  //   console.log(this.data)
  //   this.members = this.data['members']
  //   // console.log(this.members)
  //   // console.log(this.data)
  //   // this.memberids = this.getKeys(this.members)
  //   this.memberdata = this.data['memberdata']
  // }
  ngOnInit(): void {
    // bind
    // console.log(this.members)
  }

}
