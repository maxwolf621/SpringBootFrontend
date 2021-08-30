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
  
  /**
   * 
   * Dependency Injection
   * @param http Performs HTTP requests
   */
  constructor(private http:HttpClient) {
  }

  /**
   * 
   * @returns Posts 
   */
  getAllPost() : Observable<PostModel[]>{
      console.log("Display All Posts");
      return this.http.get<PostModel[]>(`${environment.apiPost}`);
  }
  
  /**
   * 
   * @param postPayload contains postname, who post it, description ... 
   * @returns DOT (post response) from backend
   */
  createPost(postPayload: CreatePostPayload): Observable<any> {
      return this.http.post(`${environment.apiPost}`, postPayload);
  }

  /**
   * 
   * @param id looking for a certain post by post id
   * @returns a certain post 
   */
  getPost(id: number): Observable<PostModel> {
      return this.http.get<PostModel>(`${environment.apiPost}/` + id);
  }

  /**
   * 
   * @param name Looking for a certain post by username
   * @returns a certain post
   */
  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.apiPost}/user/` + name);
  }
}