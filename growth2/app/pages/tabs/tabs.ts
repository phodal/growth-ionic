import {Component} from "@angular/core";
import {MainView} from "../main/main";
import {DiscoverPage} from "../discover/index";
import {UserCenterPage} from "../user-center/index";
import {CommunityPage} from "../community/index";

@Component({
  templateUrl: "build/pages/tabs/tabs.html"
})
export class TabsPage {
  mainView:any = MainView;
  discoverView:any = DiscoverPage;
  communityView:any = CommunityPage;
  userCenterView:any = UserCenterPage;
}
