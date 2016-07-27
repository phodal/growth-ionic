import {Component} from "@angular/core";
import {NavParams, ToastController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {filter} from "lodash";
import {SanitizeHtml} from "../../../pipes/SanitizeHtml.pipe";
import {TimeAgoPipe} from "angular2-moment/index";
import {UserData} from "../../../providers/user-data";

@Component({
  templateUrl: "build/pages/community/detail/index.html",
  providers: [Http, HTTP_PROVIDERS],
  pipes: [
    SanitizeHtml,
    TimeAgoPipe
  ]
})

export class CommunityDetailPage {
  private topic;
  private discussions;
  private nextPageUrl;
  private post;
  private isLogin = false;
  private replyContent = "";
  private topicId;
  private isShowCommentBox = false;
  private token;
  private replyToUser;
  private replyToId;
  private loading = false;

  constructor(private toastCtrl:ToastController, public http:Http, public params:NavParams, private userData:UserData) {
    this.http = http;
    this.topicId = params.get("topicId");
    this.userData = userData;
    this.isLogin = this.userData.isLogin();
    this.init(this.topicId);
  }

  getUsername = function (user) {
    let included = this.discussions;
    for (let i = 0; i < included.length; ++i) {
      if (included[i].type === "users" && included[i].id === user.data.id) {
        return included[i].attributes.username;
      }
    }
    return "User";
  };

  showCommentBox() {
    if (this.isShowCommentBox) {
      this.isShowCommentBox = false;
    } else {
      this.isShowCommentBox = true;
    }
  }

  replyTo(user, id) {
    this.isShowCommentBox = true;
    this.replyToUser = user;
    this.replyToId = id;
  };

  saveReply() {
    let self = this;
    let headers = new Headers();
    let replyContent = self.replyContent;

    if (self.replyToUser !== "" && self.replyToUser !== "") {
      replyContent = "@" + self.replyToUser + "#" + self.replyToId + self.replyContent;
    }

    let reply = {
      "data": {
        "type": "posts",
        "attributes": {"content": replyContent},
        "relationships": {"discussion": {"data": {"type": "discussions", "id": this.topicId}}}
      }
    };

    self.isShowCommentBox = true;
    headers.append("Authorization", "Token " + self.token);

    this.http.post("http://forum.growth.ren/api/posts", reply, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          self.isShowCommentBox = false;
          self.replyContent = "";
          self.discussions.push(data.data);

          let toast = self.toastCtrl.create({
            message: "回复成功",
            duration: 1000,
            position: "top"
          });
          toast.present();
        },
        error => {
          alert(error);
        }
      );
  }

  init(topicId) {
    let url = SERVER_BASE_URL.forum + "/" + topicId;
    let self = this;
    self.loading = true;

    this.userData.getToken().then(token => self.token = token);

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        response => {
          self.topic = response.data;
          self.discussions = response.included;

          let postId = response.data.relationships.posts.data[0].id;
          self.post = filter(response.included, {type: "posts", id: postId})[0];
          // noinspection TypeScriptUnresolvedVariable
          if (response.links && response.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = response.links.next;
          } else {
            self.nextPageUrl = null;
          }

          self.loading = false;
        }
      );
  }

}
