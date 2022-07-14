import AppButton from "./AppButton.vue";

describe("AppButton.cy.ts", () => {
  it("renders an app button", () => {
    cy.mount(() => <AppButton></AppButton>);
  });
});
