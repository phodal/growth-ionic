import {Component} from "@angular/core";

@Component({
  template: `
  <div text-center padding class="transparent-bg white content-container">
    <ion-icon name="cloud-outline" class="content-icon"></ion-icon>
    <h1>Cloud</h1>
    <p class="white">The Ionic Cloud is a suite of backend services that make building, deploying and scaling apps easy! Free to get started!</p>
  </div>
  `
})
export class PageTwo {

  constructor() {
  }
}
