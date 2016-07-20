import {Component} from "@angular/core";
import {MainView} from "../main/main";
import {SolutionPage} from "../solution";
import {MorePage} from "../more/index";
import {DiscoverPage} from "../discover/index";

@Component({
  templateUrl: "build/pages/tabs/tabs.html"
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab"s root Page
  mainView:any = MainView;
  solutionView:any = SolutionPage;
  discoverView:any = DiscoverPage;
  moreView:any = MorePage;
}
