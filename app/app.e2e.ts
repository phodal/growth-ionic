describe("MyAPP", () => {
  browser.get("");
  it("should have a title", () => {
    expect(browser.getTitle()).toEqual("Growth");
  });

  it("should have <nav>", () => {
    expect(element(by.css("ion-navbar")).isPresent()).toEqual(true);
  });

  it("should show tutorial first", () => {
    expect(element(by.css("ion-navbar:first-child")).getText()).toContain("S");
    // expect(element(by.css("ion-navbar:first-child")).getText()).toContain("S");
  });

  it("should have correct nav text for Home", () => {
    element(by.css("ion-navbar ion-buttons .bar-button")).click()
      .then(function () {
        browser.driver.sleep(1000);
        expect(element(by.css(".main-view ion-navbar:first-child")).getText()).toContain("Growth");
      });
  });

  it("should have correct day for Home", () => {
    expect(element(by.css("ion-card.day-0 ion-label h2")).getText()).toContain("从零开始");
  });

  it("should have correct footer Home", () => {
    expect(element(by.css("ion-tabbar a span")).getText()).toContain("首页");
  });
});
