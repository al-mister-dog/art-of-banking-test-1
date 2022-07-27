import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { MemoryRouter } from "react-router-dom";
import TheFed from "./TheFed";
import { steps } from "./TheFed";

function renderPage() {
  render(
    <Provider store={store}>
      <TheFed />
    </Provider>,
    { wrapper: MemoryRouter }
  );
}

describe("The Fed Page", () => {
  test("lecture step titles", () => {
    renderPage();
    steps.forEach((step) => expect(screen.getByText(step)).toBeInTheDocument());
  });
});
