import {Component} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {UserData} from "../../../providers/user-data";
import "rxjs/add/operator/map";
import {NavController, ToastController} from "ionic-angular/index";

@Component({
  templateUrl: "build/pages/community/create/index.html"
})

export class CreateTopicPage {
  private postForm:{title?:string, content?:string} = {};
  private isInCreating = false;
  private token;

  constructor(private http:Http, private toastCtrl:ToastController,
              private userData:UserData, private nav:NavController) {
    this.http = http;
    this.init();
    this.nav = nav;
  }

  create(post) {
    this.isInCreating = true;
    let self = this;
    let headers = new Headers();

    let data = {
      "data": {
        "attributes": {
          "content": post.content,
          "title": post.title
        },
        "relationships": {"tags": {"data": [{"id": "3", "type": "tags"}, {"id": "1", "type": "tags"}]}},
        "type": "discussions"
      }
    };

    headers.append("Authorization", "Token " + self.token);

    self.http.post("http://forum.growth.ren/api/discussions", data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        data => {
          let postData = data;
          this.isInCreating = false;
          let toast = self.toastCtrl.create({
            message: "欢迎回来," + postData,
            duration: 2000,
            position: "top"
          });
          toast.present();
          self.nav.pop();
        },
        error => {
          alert(error);
        }
      );
  }

  private init() {
    let self = this;
    this.userData.getToken().then(token => self.token = token);
  }
}
