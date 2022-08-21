// import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalletyItem({ src, alt }) {
  return (
    <li className={s.Item}>
      <img src={src} alt={alt} className={s.Image} />
    </li>
  );
}

export default ImageGalletyItem;
