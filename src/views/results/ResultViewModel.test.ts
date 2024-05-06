import { renderHook, waitFor } from "@testing-library/react";
import ResultViewModel from "./ResultViewModel";

const mockGetItemsBySearch = jest.fn().mockResolvedValue({
  result: {
    categories: ["Root Category"],
    items: [
      {
        condition: "new",
        free_shipping: true,
        id: "1",
        picture: "https://example.com/item1.jpg",
        price: {
          amount: 10,
          currency: "USD",
          decimals: 0,
        },
        title: "Item 1",
      },
    ],
    total: 1,
  },
});
jest.mock("../../services/items/itemsModel", () => ({
  getItemsBySearch: (...p: any) => mockGetItemsBySearch(...p),
}));

Object.defineProperty(global, "location", {
  value: {
    search: "search=celulares",
  },
  writable: true, // possibility to override
});

describe("ResultViewModel test", () => {
  it("should retunr properties", async () => {
    const { result } = renderHook(() => ResultViewModel());
    await waitFor(() => {
      expect(result.current.categories).toEqual(["Root Category"]);
    });
  });

  it("should retunr properties when no results", async () => {
    mockGetItemsBySearch.mockResolvedValueOnce({});
    const { result } = renderHook(() => ResultViewModel());
    await waitFor(() => {
      expect(result.current.categories).toEqual([]);
    });
  });

  it("should console error", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockGetItemsBySearch.mockRejectedValueOnce("error");
    const { result } = renderHook(() => ResultViewModel());
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});
