import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { getDatabase } from "../database";
import { SexEnum } from "../enum/sex.enum";

interface User {
  name: string;
  sex: SexEnum;
  age: string;
  height: string;
  sleepTimeAverage: string;
}

function Panel() {
  const [data, setData] = useState<User>({} as User);
  const navigate = useNavigate();

  function getData() {
    getDatabase()
      .get("/user", { withCredentials: true })
      .then((res) => {
        setData({ ...res.data.data });
      })
      .catch((error) => {});
  }

  function sex(sex: SexEnum) {
    switch(sex) {
        case SexEnum.MALE:
            return 'homem';
        case SexEnum.FEMALE:
            return 'mulher';
        case SexEnum.OTHER:
        return 'outro';
    }
  }

  useEffect(() => {
    getDatabase().get("/auth", { withCredentials: true }).catch(() => {
      navigate("/");
    });
    getData();
  }, [navigate]);

  return (
    <div className="text-gray-700 font-bold background bg-gray-700 w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center gap-2 w-full p-2">
        <div className="color w-full rounded-lg p-2 border-2 border-gray-700 shadow flex flex-col ">
          <div className="text-3xl">Tempo de sono médio:</div>
          <div className="text-cyan-700 flex flex-row justify-center items-center w-full flex-grow">
            <div className="text-8xl p-1">
              {data.sleepTimeAverage && data.sleepTimeAverage.split(":")[0]}h
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold p-1">
                {data.sleepTimeAverage && data.sleepTimeAverage.split(":")[1]}min
              </div>
              <div className="text-2xl font-bold p-1">
                {data.sleepTimeAverage && data.sleepTimeAverage.split(":")[2]}sec
              </div>
            </div>
          </div>
        </div>
        <div className="color w-full rounded-lg p-2 border-2 border-gray-700 shadow">
          <div>Nome: {data.name}</div>
          <div>Sexo: {sex(data.sex)}</div>
          <div>Idade: {data.age}</div>
          <div>Altura: {data.height}m</div>
        </div>
      </div>
    </div>
  );
}

export default Panel;
