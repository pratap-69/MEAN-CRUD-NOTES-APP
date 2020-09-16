import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post";
@Injectable({
  providedIn: "root",
})
export class CRUDService {
  constructor(private HttpClient: HttpClient) {}
  //public posts: Post[] = [];
  public postDetails:Post;
  getPosts() {
    return this.HttpClient.get<{ message: string; data: any }>(
      "http://localhost:3000/api/posts"
    );
  }

  addPost(post: Post) {
    return this.HttpClient.post<{ CreatedPostId: string; message: string }>(
      "http://localhost:3000/api/posts",
      post
    );
  }

  deletePost(postId: string) {
    console.log(postId);
    return this.HttpClient.delete("http://localhost:3000/api/posts/" + postId);
  }

  getPost(id: string) {
    console.log(id);
    return this.HttpClient.get<{ id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    return this.HttpClient.put("http://localhost:3000/api/posts", post);
  }
}
