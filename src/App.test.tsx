import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/home/Home";
import { MemoryRouter } from "react-router-dom";

describe("Home Page", () => {
  test("Home page title renders", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText(/Learn the Art of Banking/i)).toBeInTheDocument();
  });
});
