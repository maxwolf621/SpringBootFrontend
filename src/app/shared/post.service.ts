import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { environment } from '../../environments/environment';
import { CreatePostPayload } from '../post/create-post/create-post.pyload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http:HttpClient) {
  }

  getAllPost() : Observable<PostModel[]>{
      console.log("Get All Posts From BackEnd")
      return this.http.get<PostModel[]>(`${environment.apiPost}`);
  }
  
  createPost(postPayload: CreatePostPayload): Observable<any> {
      return this.http.post(`${environment.apiPost}`, postPayload);
  }

  getPost(id: number): Observable<PostModel> {
      return this.http.get<PostModel>(`${environment.apiPost}/` + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.apiPost}/user/` + name);
  }
}
