import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-button/vote-payload';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
 
  constructor(private http: HttpClient) { }

  VoteForPost(votePayload: VotePayload): Observable<any> {
    console.info("Vote For Post");
    return this.http.post(environment.apiVote, votePayload);
  }
}
