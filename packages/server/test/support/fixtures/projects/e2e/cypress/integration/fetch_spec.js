/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("fetch works", function() {
  it("sets polyfilled state", () => cy.visit("http://localhost:1818/first")
    .then(() => expect(cy.state("fetchPolyfilled")).to.be.true));

  it("spies on fetch requests", function() {
    cy.server();
    cy.route("/get-json").as("get-json");
    cy.visit("http://localhost:1818/first");
    return cy.wait("@get-json");
  });

  it("spies on fetch requests from second page", function() {
    cy.server();
    cy.route("/get-text").as("get-text");
    cy.visit("http://localhost:1818/first");
    cy.contains("a", "second").click();
    cy.wait("@get-text");
    // confirm the real response from the server is shown
    return cy.contains("text: pong").should("be.visible");
  });

  it("stubs GET fetch text", function() {
    cy.server();
    cy.route("/get-text", "mock pong");
    cy.visit("http://localhost:1818/second");
    // confirm the stub response is shown
    return cy.contains("text: mock pong").should("be.visible");
  });

  it("spies on fetch POST", function() {
    cy.server();
    cy.route("POST", "/add").as("add");
    cy.visit("http://localhost:1818/addition");
    cy.wait("@add");
    // confirm the response from the server is displayed
    return cy.contains("answer: 17").should('be.visible');
  });

  return it("stubs fetch POST", function() {
    cy.server();
    cy.route("POST", "/add", {answer: 193}).as("add");
    cy.visit("http://localhost:1818/addition");
    cy.wait("@add");
    // confirm the stub was used
    return cy.contains("answer: 193").should('be.visible');
  });
});

