import {Component} from "@angular/core";
import {HomePage} from "../home/home";
import {DiscoverPage} from "../discover/discover";
import {UserCenterPage} from "../user-center/user-center";
import {CommunityPage} from "../community/community";
import {SkillTreePage} from "../skill-tree/skill-tree";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  mainView:any = HomePage;
  discoverView:any = DiscoverPage;
  communityView:any = CommunityPage;
  userCenterView: any = UserCenterPage;
  skillTreeView: any = SkillTreePage;

  constructor() {

  }
}
