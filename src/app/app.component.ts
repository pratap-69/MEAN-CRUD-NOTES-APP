import { Component, OnInit } from "@angular/core";
import { CRUDService } from "./crud.service";
import { Post } from "./post";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "MEAN-CRUD";
  constructor(private service: CRUDService) {}
  ngOnInit() {
    //this.posts = this.service.posts;
    //console.log(this.posts);

  }

  // addPost() {
  //   const post: Post = {
  //     id: "null",
  //     title: this.postTitle,
  //     content: this.postContent,
  //   };
  //   this.service.addPost(post).subscribe((responseData) => {
  //     //console.log(responseData);
  //     post.id = responseData.CreatedPostId;
  //     this.posts.push(post);
  //     console.log(this.posts);
  //     this.postTitle = "";
  //     this.postContent = "";
  //   });
  // }

}
