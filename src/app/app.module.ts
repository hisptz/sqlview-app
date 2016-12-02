import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DhisMenuComponent } from './dhis-menu/ng2-dhis-menu';
import { SqlLeftMenuComponent } from './sql-left-menu/sql-left-menu.component';
import { SqlViewComponent } from './sql-view/sql-view.component';
import { OrgUnitStructureComponent } from './org-unit-structure/org-unit-structure.component';
import { SqlViewAppRoutingModule } from "./app-routing.module";
import { SqlDatavalueComponent } from './sql-datavalue/sql-datavalue.component';
import { DhisOrgUnitTreeComponent } from "./org-unit-tree/ng2-dhis-org-unit-tree";
import { TreeModule } from "angular2-tree-component";
import {OrgUnitSqlService} from "./org-unit-structure/org-unit-sql.service";
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    DhisMenuComponent,
    SqlLeftMenuComponent,
    SqlViewComponent,
    OrgUnitStructureComponent,
    SqlDatavalueComponent,
    DhisOrgUnitTreeComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SqlViewAppRoutingModule,
    TreeModule
   ],
  providers: [OrgUnitSqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
