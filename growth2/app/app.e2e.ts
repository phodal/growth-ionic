describe("MyAPP", () => {
  browser.get("");
  //
  // beforeEach(() => {
  //
  // });

  it("should have a title", () => {
    expect(browser.getTitle()).toEqual("Growth");
  });

  it("should have <nav>", () => {
    expect(element(by.css("ion-navbar")).isPresent()).toEqual(true);
  });

  it("should have correct nav text for Home", () => {
    expect(element(by.css("ion-navbar:first-child")).getText()).toContain("Growth");
  });

  it("should have correct day for Home", () => {
    expect(element(by.css("ion-card.day-0 ion-label h2")).getText()).toContain("从零开始");
  });

  it("should have correct footer Home", () => {
    expect(element(by.css("ion-tabbar a span")).getText()).toContain("首页");
  });
});
