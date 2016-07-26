import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {getSpinnerConfig} from "../../../utils/helper";
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

  constructor(private loadingCtrl:LoadingController, public http:Http, public params:NavParams, private userData:UserData) {
    this.http = http;
    let topicId = params.get("topicId");
    this.init(topicId);
    this.userData = userData;
    this.isLogin = this.userData.isLogin();
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

  init(topicId) {
    let url = SERVER_BASE_URL.forum + "/" + topicId;
    let self = this;
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

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

          loading.dismiss();
        }
      );
  }

}
