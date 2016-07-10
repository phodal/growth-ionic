import {Component} from "@angular/core";
import {MainView} from '../main/main';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  mainView: any = MainView;
  tab2Root: any = Page2;
  tab3Root: any = Page3;
}
