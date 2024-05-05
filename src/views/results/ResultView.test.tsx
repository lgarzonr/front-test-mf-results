import React from "react";
import ResultsView from "./ResultView";
import { render } from "@testing-library/react";

jest.mock("./ResultViewModel", () => () => ({
  resultItems: [
    {
      id: "1",
      title: "Item 1",
      price: {
        amount: 10,
        currency: "USD",
        decimals: 0,
      },
      picture: "https://example.com/item1.jpg",
      condition: "new",
      free_shipping: true,
    },
  ],
  categories: ["Root Category"],
  resultTotal: {
    name: "Category 1",
    totalITems: 1,
  },
}));

describe("ResultView Test", () => {
  it("should render the ResultView component", () => {
    const view = render(<ResultsView></ResultsView>);
    expect(view.getByText("Root Category")).toBeTruthy();

    // const button = view.getByTestId("SearchIcon");
    // userEvent.click(button);

    // expect(onSearchClick).toHaveBeenCalledTimes(1);
  });
});
