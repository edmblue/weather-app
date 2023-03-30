import { registrarFecha } from '../helpers';
import useWeather from '../hooks/useWeather';
import { formatTemp } from '../helpers';
import IconsWeather from '../data/icons.json';
import Spinner from './Spinner';

const WeekdaysInfo = () => {
  const { city, weeklyData, isLoading, tempChange } = useWeather();

  return (
    <div
      className={`"flex py-7 items-center justify-between px-1" ${
        city.length > 0 ? 'block' : 'hidden'
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex px-4 w-full text-sm dark:text-gray-300 flex-col gap-6">
          {weeklyData?.map((data, i) => {
            const weekArray = [8, 16, 24, 32, 40];

            if (!weekArray.includes(i + 1)) {
              return;
            }

            const { dt, main, weather } = data;
            const time = registrarFecha(dt);
            const weekDay = time.day;
            const tempMin = main.temp_min;
            const tempMax = main.temp_max;
            const weatherId = weather[0].id;

            return (
              <div className="flex justify-between" key={i}>
                <p>{weekDay}</p>
                <div>
                  <i
                    className={`wi wi${
                      !(weatherId > 699 && weatherId < 800) &&
                      !(weatherId > 899 && weatherId < 1000)
                        ? '-day'
                        : ''
                    }-${IconsWeather[weatherId]?.icon} text-[2rem]`}
                  ></i>
                </div>
                <p>{`${formatTemp(tempMin, tempChange)} / ${formatTemp(
                  tempMax,
                  tempChange
                )}`}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeekdaysInfo;
