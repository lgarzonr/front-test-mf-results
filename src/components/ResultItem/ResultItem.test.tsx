import { render } from "@testing-library/react";
import ResultItem from "./ResultItem";
import React from "react";

describe("ResultItem test", () => {
  it("should render the ResultItem component", () => {
    const view = render(
      <ResultItem
        resultData={{
          id: "123",
          title: "Test",
          price: {
            currency: "USD",
            amount: 100,
            decimals: 0,
          },
          picture: "test.jpg",
          condition: "new",
          free_shipping: true,
        }}
      />
    );
    expect(view.getAllByText("Test")).toBeTruthy();
  });
});
