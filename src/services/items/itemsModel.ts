import httpClient from "../../utils/httpClient";

const BASE_SERVICE_URL = "https://api.mercadolibre.com/sites/MLA";

interface Item {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
}

export interface ItemsBySearchResponse {
  categories: Array<string>;
  items: Array<Item>;
  total: number;
}

export const getItemsBySearch = async (search: string) => {
  try {
    const response: {
      results: Array<{
        id: string;
        title: string;
        currency_id: string;
        price: number;
        thumbnail: string;
        condition: string;
        shipping: {
          free_shipping: boolean;
        };
      }>;
      filters: Array<{
        id: string;
        name: string;
        values: Array<{
          id: string;
          name: string;
          path_from_root: Array<{ id: string; name: string }>;
        }>;
      }>;
      paging: { total: number };
    } = await httpClient.get(`${BASE_SERVICE_URL}/search?q=${search}`);

    const result: ItemsBySearchResponse = {
      categories: response.filters[0]?.values[0].path_from_root.map(
        (path) => path.name
      ),
      total: response.paging.total,
      items: response.results.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 0, // Add the missing 'decimals' property
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    };

    return { result, error: false };
  } catch (error) {
    return { error };
  }
};
