import { useState } from "react";

import { Header } from "./components/Header";
import { Main } from "./components/Main";

export default function App() {
  const [name, setName] = useState("Igor Silva");

  function handleNameChange(event) {
    setName(event.currentTarget.value);
  }

  return (
    <div>
      <Header size='large'>Project: React-Hello</Header>

      <Main>
        <div className='flex flex-col my-4'>
          <label htmlFor='inputName' className='text-sm mb-1'>
            Digite seu nome:
          </label>
          <input
            autoFocus
            id='inputName'
            className='border p-1'
            type='text'
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <p>
          O seu nome é {name}, com {name.length} caracteres, e você possui 22
          anos.
        </p>
      </Main>
    </div>
  );
}
