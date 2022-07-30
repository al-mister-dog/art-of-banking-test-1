import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { lectures } from "../config/lecturesConfig";
import { MemoryRouter } from "react-router-dom";
import Fundamentals from "./Fundamentals";

// const steps = lectures.fundamentals.steps;
import { steps } from "./Fundamentals";
import { BoardContainer } from "../components/ui/board/BoardContainer";
function renderPage() {
  render(
    <Provider store={store}>
      <Fundamentals />
    </Provider>,
    { wrapper: MemoryRouter }
  );
}

describe("Fundamentals Page", () => {
  test("lecture step titles", () => {
    renderPage();
    steps.forEach((step) => expect(screen.getByText(step)).toBeInTheDocument());
  });
  
});
