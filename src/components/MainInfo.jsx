import { useState, useEffect } from 'react';
import { ReactComponent as MagnGlass } from '../assets/images/magnifying-glass-backup-svgrepo-com.svg';
import { ReactComponent as WindImg } from '../assets/images/wind-svgrepo-com.svg';
import { ReactComponent as HumImg } from '../assets/images/humidity-alt-svgrepo-com.svg';
import useWeather from '../hooks/useWeather';
import { formatTemp } from '../helpers';
import Spinner from './Spinner';
import IconsWeather from '../data/icons.json';

const MainInfo = () => {
  const { handleCity, city, cityWeatherInfo, isLoading, tempChange } =
    useWeather();

  const {
    name,
    country,
    time,
    temp,
    feelsLike,
    humidity,
    windSpeed,
    weatherId,
  } = cityWeatherInfo;

  const [tempValue, setTempValue] = useState(0);

  useEffect(() => {
    setTempValue(formatTemp(temp, tempChange));
  }, [tempChange, cityWeatherInfo]);

  return (
    <main>
      <form>
        <div className="relative">
          <input
            onChange={handleCity}
            value={city}
            type="text"
            className="dark:bg-black border-b-2 dark:border-white w-full outline-none px-6 py-1"
            placeholder="Please enter a city name"
          />
          <MagnGlass className="absolute w-[1.2rem] top-2 h-auto dark:fill-white fill-black" />
        </div>
      </form>
      <div className="flex py-7 items-center justify-between px-1">
        {isLoading ? (
          <Spinner />
        ) : city.length > 0 ? (
          <>
            <div className="flex gap-10 flex-col">
              <div>
                <p className="text-xl font-semibold">
                  {name}, {country}
                </p>
                <p className="text-gray-400 text-sm">{time}</p>
              </div>
              <div>
                <p className="text-6xl">{tempValue}</p>
                <p className="text-gray-400 text-sm">
                  Feels like {formatTemp(feelsLike, tempChange)}
                </p>
              </div>
              <div className="dark:text-gray-300 text-black text-sm flex flex-col md:flex-row gap-2">
                <div className="flex gap-1">
                  <div>
                    <WindImg className="h-auto w-[1.3rem] dark:stroke-white stroke-black" />
                  </div>
                  <p>{windSpeed} m/s winds</p>
                </div>
                <div className="flex gap-1">
                  <div>
                    <HumImg className="w-[1.3rem] h-auto dark:fill-white fill-black" />
                  </div>
                  <p>{humidity}% humidity</p>
                </div>
              </div>
            </div>
            <div>
              <i
                className={`wi wi${
                  !(weatherId > 699 && weatherId < 800) &&
                  !(weatherId > 899 && weatherId < 1000)
                    ? '-day'
                    : ''
                }-${IconsWeather[weatherId]?.icon} text-[6rem] md:text-[8rem]`}
              ></i>
            </div>
          </>
        ) : (
          <div className="text-center w-full">
            <p className="font-semibold uppercase dark:text-gray-300">
              Search for a City Weather
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainInfo;
