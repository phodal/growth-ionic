import {addProviders} from "@angular/core/testing";
import {MainView} from "./main";
import {providers} from "../../../test/diExports";

let mainView:MainView = null;

class MockClass {
  public ready():any {
    return new Promise((resolve:Function) => {
      resolve();
    });
  }

  public close():any {
    return true;
  }

  public setRoot():any {
    return true;
  }
}

describe("MainView", () => {

  beforeEach(() => {
    addProviders(providers);
    let mockClass:any = (<any>new MockClass());
    mainView = new MainView(mockClass, mockClass, mockClass);
  });

  xit("page test", () => {
    spyOn(mainView.nav, "push").and.stub();
    mainView.openSectionDetailsPage(1);
    expect(mainView.nav.push).toHaveBeenCalledWith(1);
  });
});
