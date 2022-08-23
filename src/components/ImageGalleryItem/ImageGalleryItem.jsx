import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalletyItem({ src, alt, onOpenModal, largeImageURL }) {
  return (
    <li className={s.Item}>
      <img
        src={src}
        alt={alt}
        className={s.Image}
        onClick={() => onOpenModal(largeImageURL)}
      />
    </li>
  );
}

ImageGalletyItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalletyItem;
