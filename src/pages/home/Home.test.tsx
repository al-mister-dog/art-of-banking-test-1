import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

describe("Home Page", () => {
  test("Title renders", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText(/Learn the Art of Banking/i)).toBeInTheDocument();
  });
  test("Subtitle renders", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(
      screen.getByText(
        /from the Italian masters to the New York Money Market.../i
      )
    ).toBeInTheDocument();
  });
  test("body text renders", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(
      screen.getByText(
        /Understanding banking and finance is a key requirement of making informed decisions/i
      )
    ).toBeInTheDocument();
  });
});
