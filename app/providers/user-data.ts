import {Injectable} from "@angular/core";
import {Events, LocalStorage, Storage} from "ionic-angular";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserData {
  HAS_LOGGED_IN = "hasLoggedIn";
  storage = new Storage(LocalStorage);
  private hasLogin = false;

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
          self.hasLogin = true;
          self.storage.set(this.HAS_LOGGED_IN, true);
          self.events.publish("user:login", user.username);
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
    this.storage.remove("token");
    this.storage.remove("username");
    this.events.publish("user:logout");
  }

  setToken(token) {
    this.storage.set("token", token);
  }

  getToken() {
    return this.storage.get("token").then((value) => {
      return value;
    });
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
    return this.hasLogin;
  };

  // return a promise
  hasLoggedIn() {
    let self = this;
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      self.hasLogin = value === "true";
      return self.hasLogin;
    });
  }
}
