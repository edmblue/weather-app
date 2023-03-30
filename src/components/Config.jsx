import { ReactComponent as GearImg } from '../assets/images/gear-svgrepo-com.svg';
import useWeather from '../hooks/useWeather';

const Config = () => {
  const { setTempChange, tempChange } = useWeather();

  const handleTemp = () =>
    tempChange ? setTempChange(false) : setTempChange(true);

  return (
    <div className="group text-center pt-3 inline-block">
      <div>
        <GearImg className="h-auto cursor-pointer w-[1.2rem] fill-black dark:fill-[#fff5f5]" />
      </div>
      <div
        onClick={handleTemp}
        className="bg-gray-400 dark:bg-gray-200 text-white dark:text-black w-[10rem] mt-3 px-3 text-sm font-semibold cursor-pointer hover:bg-gray-400 hidden group-hover:block"
      >
        <p>Change Unit</p>
        <p>{tempChange ? 'F° to C°' : 'C° to F°°'}</p>
      </div>
    </div>
  );
};

export default Config;
