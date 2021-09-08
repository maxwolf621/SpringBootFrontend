import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService { 

  constructor(private http: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>(`${environment.apiComment}/post/` + postId);
  }
  getAllCommentsByUser(username: string) {
    return this.http.get<CommentPayload[]>(`${environment.apiComment}/user/` + username);
  }
  postComment(commentPayload: CommentPayload): Observable<any> {
    console.info("leave a comment : " + commentPayload);
    return this.http.post<any>(`${environment.apiComment}`, commentPayload);
  }
}