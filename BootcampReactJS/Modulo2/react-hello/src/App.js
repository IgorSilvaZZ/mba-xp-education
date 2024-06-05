import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { TextInput } from "./components/TextInput";
import { DateInput } from "./components/DateInput";
import { CheckboxInput } from "./components/CheckboxInput";
import { Timer } from "./components/Timer";

import { getAgeFrom } from "./helpers/dateHelpers";
import { getNewId } from "./lib/idService";
import { OnlineOffline } from "./components/OnlineOffline";

export default function App() {
  const [name, setName] = useState("Igor Silva");
  const [birthDate, setBirthDate] = useState("2001-12-06");
  const [showTimer, setShowTimer] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  function handleNameChange(newName) {
    setName(newName);
  }

  function handleBirthDateChange(newDate) {
    setBirthDate(newDate);
  }

  function toggleShowTimer(checked) {
    setShowTimer(!showTimer);
  }

  useEffect(() => {
    document.title = name;
  }, [name]);

  useEffect(() => {
    function toggleOnline() {
      setIsOnline(true);
    }

    function toggleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", toggleOnline);
    window.addEventListener("offline", toggleOffline);

    return () => {
      window.removeEventListener("online", toggleOnline);
      window.removeEventListener("offline", toggleOffline);
    };
  }, []);

  return (
    <div>
      <OnlineOffline isOnline={isOnline} />

      <Header size='large'>Project: React-Hello</Header>

      <Main>
        <div className='text-right mt-1'>{showTimer && <Timer />}</div>

        <CheckboxInput
          labelDescription='Mostrar timer'
          onCheckboxChange={toggleShowTimer}
        />

        <TextInput
          id={getNewId()}
          labelDescription='Insira seu Nome:'
          inputValue={name}
          onInputChange={handleNameChange}
          autoFocus
        />

        <DateInput
          id={getNewId()}
          labelDescription='Digite sua data de nascimento:'
          inputValue={birthDate}
          onInputChange={handleBirthDateChange}
        />

        <p>
          O seu nome é {name}, com {name.length} caracteres, e você possui{" "}
          {getAgeFrom(birthDate)} anos.
        </p>
      </Main>
    </div>
  );
}
