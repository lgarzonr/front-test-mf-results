import React from "react";
import { formattedNumber } from "../../utils/format";
import Chip from "@mui/material/Chip";

interface ResultItemData {
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

interface ResultItemProps {
  resultData: ResultItemData;
}

const ResultItem = ({ resultData }: ResultItemProps) => {
  return (
    <div className="results-view__list-item">
      <img
        className="results-view__list-item-image"
        src={resultData.picture}
        alt={resultData.title}
      />
      <h1 className="results-view__list-item-title">
        <a href={`/items/${resultData.id}`}>{resultData.title}</a>
      </h1>
      <h2 className="results-view__list-item-price">
        $ {formattedNumber(resultData.price.amount, resultData.price.decimals)}
      </h2>
      <div className="results-view__list-item-condition">
        <Chip label={resultData.condition} size="small" />
      </div>
      <span className="results-view__list-item-free-ship-label">
        {resultData.free_shipping && "Free shipping"}
      </span>
    </div>
  );
};

export default ResultItem;
