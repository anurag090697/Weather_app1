/** @format */

import "./App.css";
import sicon from "../public/search-svgrepo-com.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [weatherArr, setWeatherArr] = useState([]);
  const [city, setCity] = useState([
    "Las Vegas",
    "New York",
    "London",
    "Los Angeles",
  ]);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const [error, setError] = useState("");
  const [tmbg, settmbg] = useState("");

  function getAge(tm) {
    let tmp = new Date().getHours();
    let dt = tm.split(",");
    dt = dt[1].split(":");
    // console.log(tmp-dt[0]);
    return tmp - dt[0];
  }
  // console.log(tmbg)
  const fetchWeatherData = async () => {
    // console.log(idx);
    // const url = `http://api.weatherstack.com/current?access_key=${
    //   import.meta.env.VITE_weather_API_KEY
    // }&query=${cityName}`;
    const url =
      "https://python3-dot-parul-arena-2.appspot.com/test?cityname=" +
      city[idx];

    try {
      const response = await axios.get(url);
      const temp = response.data;
      temp.name = city[idx];
      // console.log(temp);
      setWeatherArr([...weatherArr, temp]);
      setIdx(idx + 1);
      // setError("");
    } catch (err) {
      alert("An error occurred while fetching weather data.");
      setWeatherArr([]);
    }
  };

  function checkCity(e) {
    // console.log(str);
    e.preventDefault();
    const ck = weatherArr.find((ele) => ele.name == query);
    if (!ck) {
      alert("Invalid City Name");
    } else {
      settmbg(query);
      setTimeout(() => {
        settmbg("");
      }, [3000]);
    }
  }

  function removeCity(name) {
    const temp = weatherArr.filter((ele) => ele.name != name);
    setWeatherArr(temp);
  }

  return (
    <div className='container min-w-full'>
      <nav className='w-full bg-sky-500 text-center text-white text-2xl font-medium p-3'>
        {" "}
        <h3>Anurag's Weather App</h3>
      </nav>
      <div className='border-2 border-slate-500 grid grid-cols-10 '>
        <div className='border col-span-10 md:col-span-2 flex gap-10 flex-col md:py-20 items-center justify-center p-2'>
          <button
            onClick={() => fetchWeatherData()}
            disabled={idx > 3}
            className='bg-sky-500 w-2/3 font-medium py-3 text-xl rounded-lg border text-white hover:text-sky-500 hover:border-sky-500 hover:bg-slate-100'
          >
            Get Weather
          </button>
          <div className='border flex flex-col w-full md:w-2/3 font-medium'>
            <h3 className='p-3 text-xl text-center text-white bg-sky-500'>
              City
            </h3>
            <h3
              className={`p-2 text-xl border-2  text-slate-600 text-center ${
                idx > 0 ? "border-lime-400" : "border-transparent"
              }`}
              // onClick={() => fetchWeatherData("Las Vegas")}
            >
              Las Vegas
            </h3>
            <hr />
            <h3
              className={`p-2 text-xl border-2  text-slate-600 text-center ${
                idx > 1 ? "border-lime-400" : "border-transparent"
              }`}
              // onClick={() => fetchWeatherData("New York")}
            >
              New York
            </h3>
            <hr />
            <h3
              // onClick={() => fetchWeatherData("London")}
              className={`p-2 text-xl border-2  text-slate-600 text-center ${
                idx > 2 ? "border-lime-400" : "border-transparent"
              }`}
            >
              London
            </h3>
            <hr />
            <h3
              // onClick={() => fetchWeatherData("Los Angeles")}
              className={`p-2 text-xl border-2  text-slate-600 text-center ${
                idx > 3 ? "border-lime-400" : "border-transparent"
              }`}
            >
              Los Angeles
            </h3>
          </div>
        </div>
        <div className='border col-span-10 md:col-span-8'>
          <form
            action=''
            className='flex items-center justify-end p-3 sm:py-10 sm:px-20 relative'
          >
            <input
              type='text'
              className='border-2 border-slate-500 w-2/3 md:w-1/3 rounded-l-lg p-2 text-center'
              placeholder='Enter City Name....'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />{" "}
            <button
              onClick={(e) => checkCity(e)}
              className='border-2 border-slate-500 rounded-r-lg py-2 px-4 bg-sky-500 hover:bg-sky-200'
            >
              <img src={sicon} alt='' className='w-6 ' />
            </button>
          </form>
          <div className='w-full md:w-2/3 mx-auto my-6'>
            <table className='w-full border border-slate-700 text-xs sm:text-sm text-left rtl:text-right text-gray-500'>
              <thead>
                <tr className='text-center bg-sky-500 text-white'>
                  <th className='border border-slate-700 w-44 sm:p-2'>City</th>
                  <th className='border border-slate-700 w-52 md:p-2'>
                    Description
                  </th>
                  <th className='border border-slate-700 w-32 p-2'>
                    Temperature
                  </th>
                  <th className='border border-slate-700 w-32 p-2'>Pressure</th>
                  <th className='border border-slate-700 w-32 p-2'>
                    Data Age(hrs)
                  </th>
                  <th className='border border-slate-700 w-28 p-2'>Remove</th>
                </tr>
              </thead>
              <tbody>
                {weatherArr.map((ele, idx) => (
                  <tr
                    key={idx}
                    className={`${tmbg === ele.name ? "bg-amber-300" : ""}`}
                  >
                    <th className='border border-slate-700 w-44 p-2'>
                      {ele.name}
                    </th>
                    <th className='border border-slate-700 w-52 p-2'>
                      {ele.description}
                    </th>
                    <th className='border border-slate-700 w-32 p-2'>
                      {ele.temp_in_celsius} °c
                    </th>
                    <th className='border border-slate-700 w-32 p-2'>
                      {ele.pressure_in_hPa}
                    </th>
                    <th className='border border-slate-700 w-32 p-2'>
                      {getAge(ele.date_and_time)}
                    </th>
                    <th
                      onClick={() => removeCity(ele.name)}
                      className='border border-slate-700 w-28 p-2 hover:text-rose-500'
                    >
                      Remove
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
