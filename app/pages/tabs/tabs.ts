import {Component} from "@angular/core";
import {MainView} from "../main/main";
import {ExamPage} from "../exam";
import {SolutionPage} from "../solution";
import {CommunityPage} from "../community/index";
import {MorePage} from "../more/index";

@Component({
  templateUrl: "build/pages/tabs/tabs.html"
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab"s root Page
  mainView:any = MainView;
  examView:any = ExamPage;
  solutionView:any = SolutionPage;
  communityView:any = CommunityPage;
  moreView:any = MorePage;
}
