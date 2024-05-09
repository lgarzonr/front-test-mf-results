import { getItemsBySearch, ItemsBySearchResponse } from "./itemsModel";

const mockHttpClientGet = jest.fn().mockResolvedValue({
  data: {
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
jest.mock("../../utils/httpClient", () => ({
  get: (...p: any) => mockHttpClientGet(...p),
}));

describe("getItemsBySearch", () => {
  it("should return the correct response when successful", async () => {
    const search = "celulares";
    const { result } = await getItemsBySearch(search);

    expect(result).toEqual({
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
    });
  });

  it("should return an error when an exception occurs", async () => {
    const errorSent = new Error("Network error");
    mockHttpClientGet.mockRejectedValue(errorSent);

    const search = "test";
    const { error } = await getItemsBySearch(search);
    expect(error).toEqual(errorSent);
  });
});
