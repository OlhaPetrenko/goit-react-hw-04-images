import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import s from './App.module.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    visibleBtn: false,
    showModal: false,
    modalImg: '',
  };

  getQuery = query => {
    this.setState({ query: query, page: 1 });
  };

  addPictures = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  showBtn = () => {
    this.setState(prevState => {
      return {
        visibleBtn: true,
      };
    });
  };

  hideBtn = () => {
    this.setState({ visibleBtn: false });
  };

  toggleModal = largeImageURL => {
    console.log('largeImageURL', largeImageURL);
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        modalImg: largeImageURL,
      };
    });
  };

  render() {
    const { query, page, visibleBtn, showModal, modalImg } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getQuery} />
        <ToastContainer />
        <ImageGallery
          query={query}
          page={page}
          showBtn={this.showBtn}
          hideBtn={this.hideBtn}
          onOpenModal={this.toggleModal}
        />
        {visibleBtn && <Button onClick={this.addPictures} />}

        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={modalImg} alt={query} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
