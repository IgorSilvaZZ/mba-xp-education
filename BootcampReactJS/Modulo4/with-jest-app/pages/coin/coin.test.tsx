import { render } from "@testing-library/react";

import CoinPage from "./index";

/* https://api.coingecko.com/api/v3/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false */
describe("General CoinsList test", () => {
  test("It should render", () => {
    render(<CoinPage />);
  });

  test("It should render API data", () => {
    render(<CoinPage />);
  });
});
