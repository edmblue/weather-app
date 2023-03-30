import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { registrarFecha } from '../helpers';

const WheaterContext = createContext();

const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [cityWeatherInfo, setCityWeatherInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);
  const [tempChange, setTempChange] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const getWeatherInfo = async (city) => {
    const urlGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${
      import.meta.env.VITE_API_KEY
    }`;

    try {
      setIsLoading(true);
      const responseGeo = await axios(urlGeocoding);
      const { data: geocoding } = responseGeo;
      const { lat, lon } = geocoding[0];

      const urlData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const urlDataWeekly = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const [responseData, responseWeekly] = await axios.all([
        axios(urlData),
        axios(urlDataWeekly),
      ]);

      const { data: weeklyResponseData } = responseWeekly;

      const weeklyData = weeklyResponseData.list;

      setWeeklyData(weeklyData);

      const { data: weatherData } = responseData;
      const { name, sys, dt, main, wind, weather } = weatherData;

      const time = registrarFecha(dt);
      const country = sys.country;
      const temp = main.temp;
      const feelsLike = main.feels_like;
      const humidity = main.humidity;
      const windSpeed = wind.speed;
      const weatherId = weather[0].id;

      setCityWeatherInfo((cityObj) => {
        return {
          ...cityObj,
          name,
          country,
          time: time.fecha,
          temp,
          feelsLike,
          humidity,
          windSpeed,
          weatherId,
          weeklyData,
        };
      });
    } catch (error) {
      /* console.log(error); */
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city.length > 0) {
      getWeatherInfo(city);
    }
  }, [city]);

  return (
    <WheaterContext.Provider
      value={{
        handleCity,
        city,
        cityWeatherInfo,
        isLoading,
        weeklyData,
        tempChange,
        setTempChange,
        changeTheme,
        setChangeTheme,
      }}
    >
      {children}
    </WheaterContext.Provider>
  );
};

export { WeatherProvider };

export default WheaterContext;
