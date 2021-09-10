import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { environment } from '../../environments/environment';
=======
import { environment } from 'src/environments/environment';
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
import { VotePayload } from './vote-button/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
 
  constructor(private http: HttpClient) { }

  VoteForPost(votePayload: VotePayload): Observable<any> {
<<<<<<< HEAD
    console.info("Vote For Post");
    return this.http.post(`{$environment.apiVote}/forPost`, votePayload);
=======
    return this.http.post(environment.apiVote, votePayload);
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
  }
}
