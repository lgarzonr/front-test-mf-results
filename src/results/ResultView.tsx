import React from "react";
import ResultsViewModel from "./ResultViewModel";
import "./ResultView.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formattedNumber } from "../utils/format";
import ResultItem from "../components/ResultItem/ResultItem";

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
            <ResultItem key={item.id} resultData={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
