import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { getDatabase } from "../database";

function CreateEntry() {
const [id, setId] = useState<number | undefined>(undefined);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [timeStart, setTimeStart] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function cleanFields(): void {
    setDateStart("");
    setDateEnd("");
    setTimeStart("");
    setTimeEnd("");
  }

  function create(): any {
    getDatabase()
      .post(
        "/entry",
        { dateStart, timeStart, dateEnd, timeEnd },
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

function edit() {
    getDatabase()
      .patch(
        `/entry/${id}`,
        { dateStart, timeStart, dateEnd, timeEnd },
        { withCredentials: true }
      )
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  } 


  function getEntry(id: number) {
    getDatabase()
      .get(
        `/entry/${id}`,
        { withCredentials: true }
      )
      .then((res) => {
        const data = res.data.data;
        setId(data.id);
        setDateStart(data.dateStart.split('/').reverse().join('-'));
        setDateEnd(data.dateEnd.split('/').reverse().join('-'));
        setTimeStart(data.timeStart);
        setTimeEnd(data.timeEnd);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = Number.parseInt(params.get("id") ?? "");
    if (id) getEntry(id);
  }, []);

  return (
    <div className="text-cyan-700 font-bold background h-screen w-screen color-text flex items-center justify-center flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="color flex flex-col gap-2 justify-center items-center p-2 rounded-xl w-80">
          <div className="border-2 color-border text-gray-700 gap-2 p-2 rounded-xl flex justify-center items-center flex-col w-full">
            <label className="w-full">
              Data Início
              <input
                type="date"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setDateStart(e.target.value);
                }}
                value={dateStart}
              />
            </label>
            <label className="w-full">
              Horas Início
              <input
                type="text"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setTimeStart(e.target.value);
                }}
                value={timeStart}
              />
            </label>
            <label className="w-full">
              Data Fim
              <input
                type="date"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setDateEnd(e.target.value);
                }}
                value={dateEnd}
              />
            </label>
            <label className="w-full">
              Horas Fim
              <input
                type="text"
                className="rounded-md bg-gray-700 color-text w-full p-1"
                required
                onChange={(e) => {
                  setTimeEnd(e.target.value);
                }}
                value={timeEnd}
              />
            </label>
            <button
              className="bg-gray-700 color-text p-2 w-full rounded-md mt-5"
              onClick={id ? edit : create}
            >
              {id ? 'Editar' : 'Criar'}
            </button>
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

export default CreateEntry;
