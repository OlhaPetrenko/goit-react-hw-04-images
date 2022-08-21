import { Circles } from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <Circles
      height="80"
      width="80"
      color="#ff0000"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass={s.Load}
      visible={true}
    />
  );
}

export default Loader;
