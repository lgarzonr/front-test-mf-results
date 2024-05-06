import { useEffect, useState } from "react";
import {
  ItemsBySearchResponse,
  getItemsBySearch,
} from "../../services/items/itemsModel";

const ResultsViewModel = () => {
  const [resultItems, setResultItems] = useState<
    ItemsBySearchResponse["items"]
  >([]);

  const [categories, setCategories] = useState<Array<string>>();
  const [resultTotal, setResultTotal] = useState({ name: "", totalITems: 0 });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("search");

    if (search) {
      getItemsBySearch(search)
        .then((response) => {
          setResultItems(response.result?.items ?? []);
          setCategories(response.result?.categories ?? []);
          setResultTotal({
            name: search,
            totalITems: response.result?.total ?? 0,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

  return { resultItems, categories, resultTotal };
};

export default ResultsViewModel;
