import React from "react";
import { createRoot, Container } from "react-dom/client";
import ResultsView from "./views/results/ResultView";

const mount = (rootElement: Container) => {
  const root = createRoot(rootElement);
  root.render(<ResultsView />);
};

export { mount };
