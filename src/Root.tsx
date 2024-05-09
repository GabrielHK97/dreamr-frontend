import AppLogo from "./assets/dreamr.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase } from "./database";

function Root() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  function login(): any {
    getDatabase()
      .post("/auth/login", { username, password }, { withCredentials: true })
      .then(() => {
        setMessage("Logged in!");
        navigate("/panel");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  }

  useEffect(() => {
    getDatabase().get("/auth", { withCredentials: true }).then(() => {
      navigate("/panel");
    }).catch(() => {});
  }, [navigate]);

  return (
    <div className="font-bold background h-screen w-screen color-text flex items-center justify-center flex-col">
      <div className="flex-grow flex flex-col justify-center items-center p-3 gap-3">
      <img src={AppLogo} alt="Logo"/>
        <div className="color flex flex-col gap-2 justify-center items-center p-2 rounded-xl w-80 border-2 border-gray-700 shadow">
          <div className="text-gray-700 gap-2 p-2 rounded-xl flex justify-center items-center flex-col w-full">
            <label className="w-full">
              Usuário
              <input
                type="text"
                className="rounded-md color-text bg-gray-700 w-full p-1"
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
                className="rounded-md color-text bg-gray-700 w-full p-1"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <button
              className="bg-gray-700 color-text p-2 w-full rounded-md mt-5"
              onClick={login}
            >
              Login
            </button>
            <a href="/createAccount" className="text-gray-700">
              Criar Conta
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

export default Root;
