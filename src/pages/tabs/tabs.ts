import {Component} from "@angular/core";
import {HomePage} from "../home/home";
import {DiscoverPage} from "../discover/discover";
import {UserCenterPage} from "../user-center/user-center";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  mainView:any = HomePage;
  discoverView:any = DiscoverPage;
  tab3Root: any = DiscoverPage;
  userCenterView: any = UserCenterPage;

  constructor() {

  }
}
