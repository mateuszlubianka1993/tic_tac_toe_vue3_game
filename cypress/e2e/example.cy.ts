describe("Tic Tac Toe Core Flow", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.visit("/");
  });

  it("should play a full game and record it in history", () => {
    cy.contains("START").click();
    cy.url().should("include", "/game");

    const moves = [0, 3, 1, 4, 2];
    moves.forEach((index) => {
      cy.get('[data-test="cell"]').eq(index).click();
    });

    cy.contains("Winner: X!").should("be.visible");

    cy.contains("BACK TO MENU").click();
    cy.contains("HISTORY").click();

    cy.get(".custom-scrollbar").within(() => {
      cy.contains("X WON").should("be.visible");
      cy.contains("5 moves").should("be.visible");
    });
  });
});
