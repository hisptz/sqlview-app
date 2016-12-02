import { Component, OnInit } from '@angular/core';
import {OrgUnitSqlService} from "./org-unit-sql.service";


@Component({
  selector: 'app-org-unit-structure',
  templateUrl: './org-unit-structure.component.html',
  styleUrls: ['./org-unit-structure.component.css']
})
export class OrgUnitStructureComponent implements OnInit {

  orgUnitHeader:any;
  constructor(private orgunitservice:OrgUnitSqlService) { }

  ngOnInit() {
    this.orgunitservice.getSqlFromUrl()
      .subscribe(
          data => {
            this.orgUnitHeader=data

            console.log(this.orgUnitHeader)
            //this.orgUnitHeader.push(data.headers)
          }
      );
  }
  orgunit: any;
  //oraganisation unit configuration
  tree_config = {
    show_search : false,
    multiple : false,
    search_text : 'Search',
    loading_message: 'Loading Organisation units...'
  };

  // set selected organisation unit
  onSelected ( selected_orgunit ) {
    this.orgunit = selected_orgunit;
    console.log(this.orgunit);
  }

}
