import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {log} from "util";

@Injectable()
export class OrgUnitSqlService {

  constructor(private http:Http) { }

  getSqlFromUrl(){
     var organitpath='../../../api/sqlViews/lozvU67TaFj/data.json';
       return this.http.get(organitpath)
         .map((response:Response) => response.json())
         .catch(this.HandleError);
  }

  getOrgUnitSelectedUid(uid :string){
    const orgUnit=uid;
    const dataElementUrl='../../../api/sqlViews/mhlgCx8gyEy/data.json?var=orgUnitUid:'+orgUnit;
    return this.http.get(dataElementUrl)
      .map((response:Response) =>response.json())
      .catch(this.HandleError);
  }


  private HandleError(error:any){
     console.log(error);
    return Observable.throw(error.json())
  }
}
