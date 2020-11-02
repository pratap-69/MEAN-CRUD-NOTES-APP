import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post";

@Injectable({
  providedIn: "root",
})
export class CRUDService {
  constructor(private HttpClient: HttpClient) {}
  //public posts: Post[] = [];
  public postDetails: Post;
  getPosts() {
    return this.HttpClient.get<{ message: string; data: any }>(
      "http://localhost:3000/api/posts"
    );
  }

  addPost(post: Post) {
    //post in createcomponent
    //Json can't include a file
    //FormData can hold text and blobs(file values)
    const postData = new FormData();
    postData.append("title", post.title);
    postData.append("content", post.content);
    postData.append("image", post.imagePath, post.title);
    return this.HttpClient.post<{
      CreatedPostId: string;
      message: string;
      post: Post;
    }>("http://localhost:3000/api/posts", postData);
  }

  deletePost(postId: string) {
    console.log(postId);
    return this.HttpClient.delete("http://localhost:3000/api/posts/" + postId);
  }

  getPost(id: string) {
    console.log(id);

    return this.HttpClient.get<{
      id: string;
      title: string;
      content: string;
      imagePath: string;
    }>("http://localhost:3000/api/posts/" + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let post: Post | FormData;
    if (typeof image === "object") {
      post = new FormData();
      post.append("id", id);
      post.append("title", title);
      post.append("content", content);
      post.append("image", image, title);
    } else {
      post = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
      };
    }

    // const post: Post = {
    //   id: id,
    //   title: title,
    //   content: content,
    //   imagePath: image,
    // };

    return this.HttpClient.put("http://localhost:3000/api/posts", post);
  }
}
