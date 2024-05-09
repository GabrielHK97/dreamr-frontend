import { useState } from "react";
import { SexEnum } from "../enum/sex.enum";
import { getDatabase } from "../database";

function CreateAccount() {
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function cleanFields(): void {
    setName("");
    setBirthDate("");
    setSex("");
    setHeight("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  function create(): any {
    getDatabase()
      .post(
        "/user/create",
        { name, birthDate, sex, height, username, password, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        cleanFields();
        setMessage(res.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  }

  return (
    <div className="font-bold background h-screen w-screen color-text flex items-center justify-center flex-col">
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="color flex flex-col gap-2 justify-center items-center p-2 rounded-xl w-80 border-2 border-gray-700 shadow">
          <div className="text-gray-700 gap-2 p-2 rounded-xl flex justify-center items-center flex-col w-full">
            <label className="w-full">
              Nome
              <input
                type="text"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label className="w-full">
              Data de Nascimento
              <input
                type="date"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              />
            </label>
            <label className="w-full">
              Sexo
              <select
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setSex(e.target.value);
                }}
              >
                <option disabled selected hidden></option>
                {[SexEnum.MALE, SexEnum.FEMALE, SexEnum.OTHER].map((sex) => {
                  return <option value={sex}>{sex}</option>;
                })}
              </select>
            </label>
            <label className="w-full">
              Altura
              <input
                type="text"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              />
            </label>
            <label className="w-full">
              Usuário
              <input
                type="text"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
            <label className="w-full">
              Senha
              <input
                type="password"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <label className="w-full">
              Confirmar Senha
              <input
                type="password"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </label>
            <button
              className="bg-gray-700 color-text p-2 w-full rounded-md mt-5"
              onClick={create}
            >
              Criar
            </button>
            <a href="/" className="text-gray-700">
              Voltar ao Login
            </a>
          </div>
        </div>
      </div>
      {message && (
        <div className="color w-full text-gray-700 flex justify-center items-center">
          {message}
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
