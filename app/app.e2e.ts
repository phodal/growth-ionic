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

  xit("should have correct slide bar for Home", () => {
    expect(element(by.css("ion-slide h2")).getText()).toContain("《Growth：全栈增长工程师指南》");
  });

  it("should have correct day for Home", () => {
    expect(element(by.css("ion-card.days ion-label h2")).getText()).toContain("前期准备");
  });

  it("should have correct footer Home", () => {
    expect(element(by.css("ion-tabbar a span")).getText()).toContain("GROWTH");
  });
});
