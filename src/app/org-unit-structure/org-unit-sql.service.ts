import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";

@Injectable()
export class OrgUnitSqlService {

  constructor(private http:Http) { }

  getSqlFromUrl(){
     var organitpath='../../../api/sqlViews/lozvU67TaFj/data.json';
       return this.http.get(organitpath)
         .map((response:Response) => response.json());
  }

}
