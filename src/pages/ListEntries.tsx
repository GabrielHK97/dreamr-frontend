import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

interface Entry {
  id: number;
  dateStart: string;
  dateEnd: string;
  timeStart: string;
  timeEnd: string;
  sleepTime: string;
}

function ListEntries() {
  const [data, setData] = useState<Entry[]>([]);
  const [id, setId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  function remove() {
    axios.defaults.baseURL = "http://localhost:8000";
    axios
      .delete(`/entry/${id}`, { withCredentials: true })
      .then(() => {
        getData();
      })
      .catch((error) => {});
  }

  function getData() {
    axios.defaults.baseURL = "http://localhost:8000";
    axios
      .get("/entry", { withCredentials: true })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="font-bold">
      {showModal && (
        <div
          className="absolute w-full h-full flex flex-col justify-center items-center"
          style={{ backgroundColor: `rgba(60, 60, 60, .5)` }}
        >
          <div className="color text-gray-700 p-2 rounded-lg flex flex-col justify-center items-center gap-2">
            <div>Deseja realmente excluir este registro?</div>
            <div className="flex flex-row justify-center items-center gap-2">
              <button
                className="bg-gray-700 color-text p-2 rounded-lg w-12"
                onClick={() => {
                  remove();
                  setShowModal(false);
                }}
              >
                Sim
              </button>
              <button
                className="bg-gray-700 color-text p-2 rounded-lg w-12"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="background h-screen w-screen color-text flex items-center justify-center flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col justify-start items-center gap-2 w-full p-2 overflow-y-auto">
          {data.length > 0 &&
            data.map((entry) => {
              return (
                <div className="rounded-lg color w-full text-gray-700 flex flex-row justify-center items-center border-2 border-gray-700 shadow overflow-hidden">
                  <div className="flex-grow p-2">
                    <div>Horas de sono: {entry.sleepTime}</div>
                    <table>
                      <tr>
                        <td>Início:</td>
                        <td>
                          {entry.dateStart} - {entry.timeStart}
                        </td>
                      </tr>
                      <tr>
                        <td>Fim:</td>
                        <td>
                          {entry.dateEnd} - {entry.timeEnd}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="flex flex-col justify-center items-center h-full">
                    <button
                      className="color-text p-2 h-full w-8 bg-cyan-700"
                      onClick={() => {
                        navigate(`/createEntry?id=${entry.id}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        />
                      </svg>
                    </button>
                    <button
                      className="color-text bg-red-700 p-2 h-full w-8"
                      onClick={() => {
                        setShowModal(true);
                        setId(entry.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ListEntries;
