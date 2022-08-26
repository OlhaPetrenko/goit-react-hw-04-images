import { useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import s from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  function getQuery(query) {
    setQuery(query);
    setPage(1);
  }

  function addPictures() {
    setPage(prevState => prevState + 1);
  }

  function toggleModal(largeImageURL) {
    setShowModal(prevState => !prevState);
    setModalImg(largeImageURL);
  }

  return (
    <div className={s.App}>
      <Searchbar onSubmit={getQuery} />

      <ImageGallery
        query={query}
        page={page}
        showBtn={() => setVisibleBtn(true)}
        hideBtn={() => setVisibleBtn(false)}
        onOpenModal={toggleModal}
      />
      {visibleBtn && <Button onClick={addPictures} />}

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={modalImg} alt={query} />
        </Modal>
      )}
    </div>
  );
}

export default App;
