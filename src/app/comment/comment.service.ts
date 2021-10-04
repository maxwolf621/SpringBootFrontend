import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService { 

  private readonly allCommentsForPostObs$ : BehaviorSubject<CommentPayload[]> = new BehaviorSubject<CommentPayload[]>([]); 

  constructor(private http: HttpClient) { }

  getAllCommentsForPost$(postId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>(`${environment.apiComment}/post/` + postId);
  }
  
  getAllCommentsForPost(postId: number){
    this.http.get<CommentPayload[]>(`${environment.apiComment}/post/` + postId).subscribe(
      (comments)=> {
        this.allCommentsForPostObs$.next(comments) 
      },(Error) =>{
        console.info("Error" + Error);
      }
    );
  }

  // getter for BehaviorObject allCommentsForPostObs$ 
  get allCommentsForPostObs() : Observable<CommentPayload[]> {
    return this.allCommentsForPostObs$.asObservable();
  }
  
  getAllCommentsByUser(username: string) {
    return this.http.get<CommentPayload[]>(`${environment.apiComment}/user/` + username);
  }
  
  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.post(`${environment.apiComment}`, commentPayload, {
      responseType : 'text'
    });
  }
}