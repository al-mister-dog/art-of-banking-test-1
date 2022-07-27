import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { lectures } from "../config/lecturesConfig";
import { MemoryRouter } from "react-router-dom";
import Clearinghouse from "./Clearinghouse";
import { steps } from "./Clearinghouse";
// const steps = lectures.clearinghouse.steps;
function renderPage() {
  render(
    <Provider store={store}>
      <Clearinghouse />
    </Provider>,
    { wrapper: MemoryRouter }
  );
}

describe("Clearing House Page", () => {
  test("lecture step titles", () => {
    renderPage();
    steps.forEach((step) => expect(screen.getByText(step)).toBeInTheDocument());
  });
});
