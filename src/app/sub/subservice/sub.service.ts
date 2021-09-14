import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { SubModel } from '../sub-model';

/**
 * SubService to do
 * 1. Creating Sub and passed it to backend
 * 2. Fetching All Subs from backend to display on view (page)
 */

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private http: HttpClient) { }

  getAllSubs(): Observable<Array<SubModel>>{
    return this.http.get<Array<SubModel>>(environment.apiSub);
  }
  createSub(NewSub: SubModel){
    return this.http.post<SubModel>(environment.apiSub, NewSub);
  }

  /**
   * 
   * @returns get user's subscribtion
   */
  getSubscriptions(){
    console.info("Get User's Subscriptions");
    return this.http.get<SubModel[]>(`${environment.apiBookMark}/getMyFavoriteSubs`);
  }
}
