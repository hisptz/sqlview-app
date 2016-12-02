import { Component, OnInit } from '@angular/core';
import {OrgUnitSqlService} from "../org-unit-structure/org-unit-sql.service";

@Component({
  selector: 'app-sql-view',
  templateUrl: './sql-view.component.html',
  styleUrls: ['./sql-view.component.css']
})
export class SqlViewComponent implements OnInit {
  orgUnitHeader:any;
  private loading;
  constructor(private orgunitservice:OrgUnitSqlService) { }

  ngOnInit() {
  }

//oraganisation unit configuration
  tree_config = {
    show_search : false,
    multiple : false,
    search_text : 'Search',
    loading_message: 'Loading Organisation units...'
  };

  orgunit: any;

  // set selected organisation unit
  onSelected ( selected_orgunit ) {
    this.loading=true;
    this.orgunit = selected_orgunit;
    this.orgunitservice.getOrgUnitSelectedUid(this.orgunit)
      .subscribe(
        data => {

        this.orgUnitHeader=data

        console.log(this.orgUnitHeader)
        //this.orgUnitHeader.push(data.headers)
        this.loading=false;
      },
      error=> console.log(error.json())
    );
  }
}
