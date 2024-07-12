import { fireEvent, render, screen } from "@testing-library/react";

import CoinPage from "./index";

const setFetchReturnData = (data) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );
};

/* https://api.coingecko.com/api/v3/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false */
describe("General CoinsList test", () => {
  beforeAll(() => {
    setFetchReturnData([{ id: "bitcoin" }, { id: "ethereum" }]);
  });

  test("It should render", () => {
    render(<CoinPage />);
  });

  test("It should render API data", async () => {
    render(<CoinPage />);

    await screen.findByText("bitcoin");
  });

  test("It should filter  correctly", async () => {
    render(<CoinPage />);

    await screen.findByText("bitcoin");
    await screen.findByText("ethereum");

    const filter = screen.getByLabelText(/filter/i);

    fireEvent.change(filter, { target: { value: "bitcoin" } });

    screen.getByText("bitcoin");

    expect(screen.queryByText("ethereum")).not.toBeInTheDocument();
  });
});
