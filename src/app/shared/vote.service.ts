import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VotePayload } from './vote-button/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
 
  constructor(private http: HttpClient) { }

  VoteForPost(votePayload: VotePayload): Observable<any> {
    return this.http.post(environment.apiVote, votePayload);
  }
}
