import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { environment } from 'src/environments/environment';
import { CreatePostPayload } from '../create-post/create-post.payload';

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
  

  getimagepreview(url : string): Observable<any>{
    console.log("get this post's image if it exists");
    return this.http.get<any>(url);
  }


  /**
   * 
   * @returns favorite posts 
   */
  getMyFavoritePosts() : Observable<PostModel[]>{
    console.log("Get My Favorite Post");
    return this.http.get<PostModel[]>(`${environment.apiBookMark}/getMyFavoritePosts`);
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
   * @param postPayload {@link post-}
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
  getPostById(id: number): Observable<PostModel> {
      console.log("Get Post By Id");
      return this.http.get<PostModel>(`${environment.apiPost}/getByPost/` + id);
  }

  /**
   * 
   * @param name Looking for a certain post by username
   * @returns a certain post
   */
  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.apiPost}/getByUser/` + name);
  }
}
