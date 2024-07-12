import { useEffect, useState } from "react";

export default function Coin() {
  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((resp) => resp.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((item: any) =>
          item.id.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, filterText]);

  return (
    <>
      <div>
        <div>
          <label>
            Filter
            <input
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </label>
        </div>
        <ul>
          {filteredData.map((item: any) => (
            <li key={item.id}>{item.id}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
