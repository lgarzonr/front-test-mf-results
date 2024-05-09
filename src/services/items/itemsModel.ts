import httpClient from "../../utils/httpClient";

const BASE_SERVICE_URL = "http://localhost:3000/api";

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
    const { data }: { data: ItemsBySearchResponse } = await httpClient.get(
      `${BASE_SERVICE_URL}/items?q=${search}`
    );

    return { result: data, error: false };
  } catch (error) {
    return { error };
  }
};
