import { useContext } from 'react';
import WheaterContext from '../context/WeatherProvider';

const useWeather = () => {
  return useContext(WheaterContext);
};

export default useWeather;
