/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("cy.go", function() {
  it("can move between pages correctly", () => cy
    .visit("http://localhost:1818/first")
    .get("h1").should("contain", "first")
    .get("a").click()
    .url().should("match", /second/)
    .get("h1").should("contain", "second")
    .go("back")
    .url().should("match", /first/)
    .get("h1").should("contain", "first")
    .go("forward")
    .url().should("match", /second/)
    .get("h1").should("contain", "second"));

  return it("can visit two urls and go back and forward", () => cy
    .visit("http://localhost:1818/first").contains("first")
    .visit("http://localhost:1818/second").contains("second")
    .go("back").contains("first")
    .go("forward").contains("second"));
});