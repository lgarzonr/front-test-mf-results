import React from "react";
import ResultsViewModel from "./ResultViewModel";
import "./ResultView.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { formattedNumber } from "../../utils/format";

const ResultsView = () => {
  const { resultItems, categories, resultTotal } = ResultsViewModel();
  return (
    <div className="results-view">
      <div className="results-view__first-column">
        <div className="results-view__breadcrumb">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {categories?.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </Breadcrumbs>
        </div>
        <h1 className="results-view__title">
          {resultTotal.name}
          <p>{formattedNumber(resultTotal.totalITems, 0)} resultados</p>
        </h1>
      </div>
      <div className="results-view__second-column">
        <div className="results-view__list-container">
          {resultItems.map((item) => (
            <div key={item.id} className="results-view__list-item">
              <img
                className="results-view__list-item-image"
                src={item.picture}
                alt={item.title}
              />
              <h1 className="results-view__list-item-title">
                <a href={`/items/${item.id}`}>{item.title}</a>
              </h1>
              <h2 className="results-view__list-item-price">
                $ {formattedNumber(item.price.amount, item.price.decimals)}
              </h2>
              <div className="results-view__list-item-condition">
                <Chip label={item.condition} size="small" />
              </div>
              <span className="results-view__list-item-free-ship-label">
                {item.free_shipping && "Free shipping"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
