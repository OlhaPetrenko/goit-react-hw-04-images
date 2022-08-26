import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { findPicture } from '../shared/api/findPicture';
import ImageGalletyItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import s from './ImageGallery.module.css';

function ImageGallery({ query, page, showBtn, hideBtn, onOpenModal }) {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchPictures() {
      const perPage = 12;
      const total = perPage * page;

      hideBtn();

      try {
        setStatus('pending');
        const response = await findPicture(query, page);
        if (response.data.totalHits > total) {
          showBtn();
        } else {
          hideBtn();
        }
        setPictures(prevState =>
          page > 1 ? [...prevState, ...response.data.hits] : response.data.hits
        );
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }

    fetchPictures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  return (
    <>
      {status === 'idle' && <h2 className={s.Text}>Відсутній запит!!!</h2>}

      {status === 'pending' && <Loader />}
      {status === 'resolved' && pictures.length === 0 && (
        <h2 className={s.Text}>
          На жаль, немає зображень, які відповідають Вашому пошуковому запиту.
          Будь ласка, спробуйте ще раз!
        </h2>
      )}
      {status === 'resolved' && pictures.total !== 0 && (
        <ul className={s.ImageGallery}>
          {pictures.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalletyItem
              key={id}
              src={webformatURL}
              alt={query}
              onOpenModal={onOpenModal}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
      )}
      {status === 'rejected' && <h1>{error.message}</h1>}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  hideBtn: PropTypes.func.isRequired,
  showBtn: PropTypes.func.isRequired,
};

export default ImageGallery;
