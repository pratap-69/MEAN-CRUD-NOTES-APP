import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { stringify } from "querystring";
import { CRUDService } from "../crud.service";
import { Post } from "../post";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-createpost",
  templateUrl: "./createpost.component.html",
  styleUrls: ["./createpost.component.css"],
})
export class CreatepostComponent implements OnInit {
  constructor(
    public service: CRUDService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  // public postTitle: string;
  // public postContent: string;
  public posts: Post[] = [];
  public mode = "create";
  public imagePreview;
  private postId: string;
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      postTitle: new FormControl(null, { validators: [Validators.required] }),
      postContent: new FormControl(null, { validators: [Validators.required] }),
      postImage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    //console.log(this.service.postDetails);
    // if (this.service.postDetails) {
    //   this.mode = "edit";
    //   console.log("Post Details from Service");
    //   this.postId = this.service.postDetails.id;
    //   this.postTitle = this.service.postDetails.title;
    //   this.postContent = this.service.postDetails.content;
    // } else {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        //console.log("Post Details from Database");
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        console.log(this.mode);
        this.service.getPost(this.postId).subscribe((result) => {
          console.log(result);
          // this.postTitle = result.title;
          // this.postContent = result.content;
          this.myForm.setValue({
            postTitle: result.title,
            postContent: result.content,
            postImage: null,
          });
          console.log(this.myForm);
          //alert();
        });
      } else {
        this.mode = "create";
        console.log(this.mode);
        console.log(this.myForm);
        this.postId = null;
      }
    });
    //this.service.postDetails = { id:null,title:null,content:null }
    // this.service.postDetails.id = null;
    // this.mode = "create";
    // this.postId = null;
  }

  onSavePost() {
    if (this.myForm.invalid) {
      alert("Invalid Form Please fill all details");
    }
    if (this.myForm.valid) {
      console.log("valid?", this.myForm.valid);
      // console.log("title", form.value.Title);
      // console.log("Email", form.value.Content);
      //console.log('Message', form.value.message);
      console.log("mode", this.mode);

      if (this.mode === "create") {
        //console.log("add post");
        const post: Post = {
          id: "null",
          title: this.myForm.get("postTitle").value,
          content: this.myForm.get("postContent").value,
          image: this.myForm.get("postImage").value,
        };
        this.service.addPost(post).subscribe((responseData) => {
          console.log(responseData);
          post.id = responseData.CreatedPostId;
          this.posts.push(post);
          console.log(this.posts);
          this.router.navigate(["allposts"]);
          // this.postTitle = "";
          // this.postContent = "";
        });
      } else {
        console.log("update post");
        this.service
          .updatePost(
            this.postId,
            this.myForm.get("postTitle").value,
            this.myForm.get("postContent").value,
            this.myForm.get("postImage").value
          )
          .subscribe((result) => {
            console.log(result);
            this.router.navigate(["allposts"]);
          });
      }
    }
  }
  onImagePicked(event: Event) {
    //const imageThis = this;
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({ postImage: file });
    this.myForm.get("postImage").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.myForm);
  }
}
