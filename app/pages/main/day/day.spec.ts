import {addProviders} from "@angular/core/testing";
import {Day} from "./day";
import {providers} from "../../../../test/diExports";

let dayView:Day = null;

class MockClass {
  public ready():any {
    return new Promise((resolve:Function) => {
      resolve();
    });
  }

  public close():any {
    return true;
  }

  public get():any {
    return 1;
  }

  public setRoot():any {
    return true;
  }
}

describe("dayView", () => {

  beforeEach(() => {
    addProviders(providers);
    let mockClass:any = (<any>new MockClass());
    dayView = new Day(mockClass, mockClass, mockClass);
  });

  // beforeEach(injectAsyncWrapper(asyncCallbackFactory(dayView, this, true)));

  it("initialises", () => {
    expect(dayView["day"]).toBe(1);
    expect(dayView["dayView"]["title"]).toBe("前期准备");
  });

  it("test for desc", () => {
    let modalParams = dayView.generateHtmlModalParams({type: "desc", slug: "test"});
    expect(modalParams.slug).toBe("assets/desc/test.html");
    expect(modalParams.pageTitle).toBe("简介");
  });

  it("test for intro", () => {
    let modalParams = dayView.generateHtmlModalParams({type: "intro"});
    expect(modalParams.slug).toBe("assets/days/intro-day1.html");
    expect(modalParams.pageTitle).toBe("简介");
  });

  it("test for article", () => {
    let modalParams = dayView.generateHtmlModalParams({type: "article", slug: "hello"});
    expect(modalParams.slug).toBe("assets/article/hello.html");
    expect(modalParams.pageTitle).toBe("文章");
  });
});
