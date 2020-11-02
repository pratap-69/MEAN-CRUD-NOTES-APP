import { Component, OnInit } from "@angular/core";
import { CRUDService } from "../crud.service";
import { Post } from "../post";
import { map } from "rxjs/operators";

@Component({
  selector: "app-allposts",
  templateUrl: "./allposts.component.html",
  styleUrls: ["./allposts.component.css"],
})
export class AllpostsComponent implements OnInit {
  public posts: Post[] = [];
  constructor(public service: CRUDService) {}

  ngOnInit() {
    this.service
      .getPosts()
      .pipe(
        map((postData) => {
          return postData.data.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        //alert();
        console.log(transformedPosts);
        this.posts = transformedPosts;
        //console.log(this.posts);
        //this.posts;
      });
  }

  deletePost(postId: string) {
    this.service.deletePost(postId).subscribe(() => {
      console.log("Deleted!");
      const updatedPosts = this.posts.filter((post) => post.id !== postId);
      this.posts = updatedPosts;
    });
  }

  setPostDetails(post: Post) {
    if (post) {
      this.service.postDetails = post;
    }
  }
}
