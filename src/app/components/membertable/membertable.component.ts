import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-membertable',
  templateUrl: './membertable.component.html',
  styleUrls: ['./membertable.component.css']
})
export class MembertableComponent implements OnInit {
  @Input('title') title:string="";
  @Input('members') members:any[]=[];
  @Input('level') level!:number;
  @Input('memberids') memberids:string[]=[];
  editing:boolean = false;
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
    //send list out.
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
  ngOnInit(): void {
    console.log(this.members)
  }

}
