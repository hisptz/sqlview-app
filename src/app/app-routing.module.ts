import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrgUnitStructureComponent} from "./org-unit-structure/org-unit-structure.component";
import {SqlDatavalueComponent} from "./sql-datavalue/sql-datavalue.component";
const routes: Routes = [
  { path:'orgUnitStruct',component:OrgUnitStructureComponent },
  { path:'orgUnitSelected/:uid',component:OrgUnitStructureComponent },
  { path:'sqldatavalue',component:SqlDatavalueComponent },
  { path:'',redirectTo:'/orgUnitStruct',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class SqlViewAppRoutingModule { }
