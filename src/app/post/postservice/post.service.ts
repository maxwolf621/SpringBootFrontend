import { HttpClient, HttpParams } from '@angular/common/http';
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
   * @param postTag payload that contained with PostPayload and Tag names
   * @returns DOT (post response) from backend
   */
  createPost(postTag : any): Observable<any> {
      return this.http.post(`${environment.apiPost}`, postTag);
  }
  
  /**
   * 
   * @param id looking for a certain post by post id
   * @returns a certain post 
   */
  getPostById(id: number): Observable<PostModel> {
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

  getTags():Observable<Array<string>>{
    return this.http.get<Array<string>>(`${environment.apiTag}/getalltags`);
  }

  markThePost(id : number){
    return this.http.get(`${environment.apiBookMark}/markThisPost/${id}`);
  }
  markSub(subname : string){
    return this.http.post(`${environment.apiBookMark}/markThisSub/`,{subname});
  }
}
