import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
} from "@angular/platform-browser-dynamic/testing";
import {setBaseTestProviders} from "@angular/core/testing";
import {MyApp} from "./app";

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

let myApp:MyApp = null;

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

  public logout():any {
    return true;
  }
}

describe("MyAPP", () => {

  beforeEach(() => {
    let mockClass:any = (<any>new MockClass());
    myApp = new MyApp(mockClass, mockClass);
  });

  it("initialises with a root page", () => {
    expect(myApp["rootPage"]).not.toBe(null);
  });

  it("initialises with an app", () => {
    expect(myApp["app"]).not.toBe(null);
  });
});
