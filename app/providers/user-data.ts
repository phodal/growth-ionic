import {Injectable} from "@angular/core";
import {Events, LocalStorage, Storage} from "ionic-angular";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserData {
  HAS_LOGGED_IN = "hasLoggedIn";
  storage = new Storage(LocalStorage);
  private isLoggedin = false;

  constructor(private events:Events, private http:Http) {
    this.http = http;
  }

  login(user) {
    let payload = {
      identification: user.username,
      password: user.password
    };
    let self = this;

    this.http.post("http://forum.growth.ren/api/token", payload)
      .map(response => response.json())
      .subscribe(
        data => {
          self.setUsername(user.username);
          self.setToken(data.token);
          self.isLoggedin = true;
          self.storage.set(this.HAS_LOGGED_IN, true);
          self.events.publish("user:login");
        },
        error => {
          alert(error);
        }
      );
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish("user:signup");
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove("username");
    this.events.publish("user:logout");
  }

  setToken(token) {
    this.storage.set("token", token);
  }

  setUsername(username) {
    this.storage.set("username", username);
  }

  getUsername() {
    return this.storage.get("username").then((value) => {
      return value;
    });
  }

  isLogin() {
    return this.isLoggedin;
  };

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
}
