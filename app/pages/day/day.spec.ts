import {addProviders} from "@angular/core/testing";
import {providers} from "../../../test/diExports";
import {Day} from "./day";

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
    expect(dayView["dayView"]["title"]).toBe("从零开始");
  });
});
