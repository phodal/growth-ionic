import {Injectable} from "@angular/core";
import {Events, LocalStorage, Storage} from "ionic-angular";
import {Http} from "@angular/http";

@Injectable()
export class UserData {
  HAS_LOGGED_IN = "hasLoggedIn";
  storage = new Storage(LocalStorage);

  constructor(private events:Events, private http:Http) {
    this.http = http;
  }

  login(user) {
    let payload = {
      identification: user.username,
      password: user.password
    };

    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(user.username);
    this.http.post("http://forum.growth.ren/api/token", payload)
      .subscribe(
        data => alert(data),
        error => alert(error)
      );
    this.events.publish("user:login");
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

  setUsername(username) {
    this.storage.set("username", username);
  }

  getUsername() {
    return this.storage.get("username").then((value) => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
}
