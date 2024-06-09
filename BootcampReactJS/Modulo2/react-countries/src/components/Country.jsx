import { Item } from "./Item";

export const Country = ({
  children: country = null,
  isVisited = false,
  onCountryClick = null,
}) => {
  if (!country) {
    return <div>Impossivel renderizar o páis!</div>;
  }

  const { name, capital, region, population, area } = country;

  const demographicDensity = population / area;

  const isVisitedClassName = isVisited ? "bg-green-100" : "";

  function handleCountryClick() {
    if (onCountryClick) {
      onCountryClick(country.id);
    }
  }

  return (
    <>
      <div
        className={`border p-2 m-2 cursor-pointer ${isVisitedClassName}`}
        onClick={handleCountryClick}
      >
        <ul>
          <li>
            <Item label='Nome:'>{name}</Item>
          </li>
          <li>
            <Item label='Capital:'>{capital}</Item>
          </li>
          <li>
            <Item label='Região'>{region}</Item>
          </li>
          <li>
            <Item labek='População'>{population}</Item>
          </li>
          <li>
            <Item label='Área'>{area}</Item>
          </li>
          <li>
            <Item label='Densidade demográfica'>{demographicDensity}</Item>
          </li>
        </ul>
      </div>
    </>
  );
};
