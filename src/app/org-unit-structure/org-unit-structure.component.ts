import { Component, OnInit } from '@angular/core';
import {OrgUnitSqlService} from "./org-unit-sql.service";
import {error} from "util";
import {ActivatedRoute, Router,Params} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-org-unit-structure',
  templateUrl: './org-unit-structure.component.html',
  styleUrls: ['./org-unit-structure.component.css']
})
export class OrgUnitStructureComponent implements OnInit {

  orgUnitHeader:any;
  private loading;
  private organisationuid;
  private subscription :Subscription
  private selected ={
    name:"MOH - Tanzania",id:"m0frOspS7JY", children:[]
  }
  constructor(private orgunitservice:OrgUnitSqlService,private  route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.loading=true;
    this.subscription=this.route.params.subscribe(
      (params:any)=>{
         let uid=params['uid'];
          this.fetchDataBesedToUid(uid);
           this.loading=false;
          console.log(uid);
        }
       )

  }
fetchDataBesedToUid(uid:string){
   this.orgunitservice.getOrgUnitSelectedUid(uid)
     .subscribe(
       data =>{
           this.orgUnitHeader=data
       },
       error =>console.log(error.json())
     )
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}


}
