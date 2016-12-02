import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { TreeComponent, TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular2-tree-component';

const actionMapping:IActionMapping = {
    mouse: {
        dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        click: (node, tree, $event) => {
            $event.shiftKey
                ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(node, tree, $event)
                : TREE_ACTIONS.TOGGLE_SELECTED(node, tree, $event)
        }
    }
};

@Component({
  selector: 'ng2-dhis-org-unit-tree',
  templateUrl: `
<div *ngIf="loading">{{ tree_config.loading_message }}</div>
<form *ngIf="!loading && tree_config.show_search" >
  <input #filter (keyup)="filterNodes(filter.value, tree)" placeholder="{{ tree_config.search_text }}" id="search_field"/>
</form>
<Tree
    #tree
    [nodes]="nodes"
    [focused]="true"
    [options]="customTemplateStringOptions"
    (onActivate)="activate($event)"
    (onDeactivate)="deactivate($event)"
>
  <template #treeNodeTemplate let-node>
    <span>{{ node.data.name }}</span>
  </template>
</Tree>
`,
  styleUrls: [``]
})
export class DhisOrgUnitTreeComponent implements OnInit {
    nodes: any[] = null;
    loading = true;
    out_orgunits = [];
    @Output() selected = new EventEmitter<any>();
    @Input() dhis2_url: string = '../../../';
    @Input() tree_config: any = {
        show_search : false,
        search_text : 'Search',
        loading_message: 'Loading Organisation units...'
    };

    constructor(  private http: Http )  {
        this.getOrgunitLevelsInformation()
            .subscribe(
                (data: any) => {
                    let fields = this.generateUrlBasedOnLevels( data.pager.total);
                    this.getAllOrgunitsForTree( fields )
                        .subscribe(
                            (orgUnits: any) => {
                                this.loading = false;
                                this.nodes = orgUnits.organisationUnits;
                            },
                            error => {
                                console.log('something went wrong while fetching Organisation units')
                            }
                        );
                },
                error => {
                    console.log('something went wrong while fetching Organisation units ')
                }
            );
    }

    ngOnInit (){}

    deactivate ( $event ) {
      console.log($event);
    };

    activate = ($event) => {
        this.selected.emit($event.node.data);
    };

    generateUrlBasedOnLevels (level: number){
        var fields: string;
        if ( level == 1 ) {
            fields = 'id,name';
        }else if ( level == 2 ) {
            fields = 'id,name,children[id,name]';
        }else if ( level == 3 ) {
            fields = 'id,name,children[id,name,children[id,name]]';
        }else if ( level == 4 ) {
            fields = 'id,name,children[id,name,children[id,name,children[id,name]]]';
        }else if ( level == 5 ) {
            fields = 'id,name,children[id,name,children[id,name,children[id,name,children[id,name]]]]';
        }

        return fields;
    }

    // Get system wide settings
    getOrgunitLevelsInformation () {
        return this.http.get(this.dhis2_url + 'api/organisationUnitLevels.json?fields=id')
            .map((response: Response) => response.json())
            .catch( this.handleError );
    }

    // Get system wide settings
    getAllOrgunitsForTree (fields) {
        return this.http.get(this.dhis2_url + 'api/organisationUnits.json?filter=level:eq:1&paging=false&fields=' + fields)
            .map((response: Response) => response.json())
            .catch( this.handleError );
    }

    // Handling error
    handleError (error: any) {
        return Observable.throw( error );
    }

    childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }

    filterNodes(text, tree) {
        tree.treeModel.filterNodes(text, true);
    }

    activateSubSub(tree) {
        tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
            .setActiveAndVisible();
    }

    customTemplateStringOptions = {
        // displayField: 'subTitle',
        isExpandedField: 'expanded',
        actionMapping
    }

    go($event) {
        $event.stopPropagation();
        alert('this method is on the app component')
    }
}
