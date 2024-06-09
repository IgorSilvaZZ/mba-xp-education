import { useState } from "react";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { TextInput } from "../components/TextInput";

import { allCountries } from "../data/countries";
import { Countries } from "../components/Countries";
import { Country } from "../components/Country";

export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  function toggleVisitedCountry(countryId) {
    let newVisitedCountries = [...visitedCountries];

    const isCountryVisited = newVisitedCountries.indexOf(countryId) !== -1;

    if (isCountryVisited) {
      newVisitedCountries = newVisitedCountries.filter(
        (visitedCountryId) => visitedCountryId !== countryId
      );
    } else {
      newVisitedCountries.push(countryId);
    }

    setVisitedCountries(newVisitedCountries);
  }

  const countryFilterLowerCase = countryFilter.trim().toLowerCase();

  const filteredCountries =
    countryFilterLowerCase.length >= 3
      ? allCountries.filter(({ nameLowerCase }) =>
          nameLowerCase.includes(countryFilterLowerCase)
        )
      : allCountries;

  return (
    <>
      <div>
        <Header>React Countries</Header>

        <Main>
          <TextInput
            id='inputCountryFilter'
            labelDescription='Informe o nome do país (pelo menos 3 caracteres)'
            onInputChange={handleCountryFilterChange}
            inputValue={countryFilter}
          />

          <Countries>
            <h2>{filteredCountries.length} paíse(s)</h2>
            <h3>{visitedCountries.length} país(es) visitados</h3>

            {filteredCountries.map((country) => {
              const isVisited = visitedCountries.indexOf(country.id) !== -1;

              return (
                <Country
                  key={country.id}
                  isVisited={isVisited}
                  onCountryClick={toggleVisitedCountry}
                >
                  {country}
                </Country>
              );
            })}
          </Countries>

          {/* <Countries
            visitedCountries={visitedCountries}
            onCountryClick={toggleVisited}
          >
            {filteredCountries}
          </Countries> */}
        </Main>
      </div>
    </>
  );
}
