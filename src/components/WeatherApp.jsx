import SunImage from '../assets/images/sun-svgrepo-com.svg';
import Config from './Config';
import MainInfo from './MainInfo';
import WeekdaysInfo from './WeekdaysInfo';
import '../styles/weather-icons.min.css';
import useWeather from '../hooks/useWeather';
import MoonImage from '../assets/images/moon-svgrepo-com.svg';

const WeatherApp = () => {
  const { setChangeTheme, changeTheme } = useWeather();

  const handleTheme = () =>
    changeTheme ? setChangeTheme(false) : setChangeTheme(true);

  return (
    <div className={changeTheme ? '' : 'dark'}>
      <div className="dark:bg-black bg-white min-h-screen dark:text-white">
        <header className="flex justify-between py-3 px-7">
          <h1 className="font-semibold uppercase">Weather App</h1>
          <div onClick={handleTheme} className="w-[1.3rem] cursor-pointer">
            <img src={changeTheme ? MoonImage : SunImage} />
          </div>
        </header>
        <div className="w-3/4 md:w-2/4 lg:w-2/6 m-auto pt-10">
          <MainInfo />
          <hr />
          <WeekdaysInfo />
          <Config />
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
