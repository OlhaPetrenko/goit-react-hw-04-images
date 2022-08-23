import PropTypes from 'prop-types';
import { Component } from 'react';

import { findPicture } from '../shared/api/findPicture';

import ImageGalletyItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    onOpenModal: PropTypes.func.isRequired,
    hideBtn: PropTypes.func.isRequired,
    showBtn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    perPage: 12,
  };

  state = {
    pictures: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;

    if (prevProps.query !== query) {
      this.setState({ pictures: [] });
    }

    if (prevProps.query !== query || prevProps.page !== page) {
      this.fetchPictures();
    }
  }
  async fetchPictures() {
    const { query, page, perPage, hideBtn, showBtn } = this.props;
    const total = perPage * page;
    this.setState({ status: 'pending' });
    hideBtn();
    const response = await findPicture(query, page);
    // console.log('response', response);
    try {
      if (response.data.totalHits > total) {
        showBtn();
      } else {
        hideBtn();
      }
      this.setState(prevState => {
        return {
          pictures: [...prevState.pictures, ...response.data.hits],
          status: 'resolved',
        };
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  }

  // =======================
  // componentDidUpdate(prevProps, prevState) {
  //   const { query, page, perPage } = this.props;
  //   const total = perPage * this.props.page;

  //   if (prevProps.query !== query) {
  //     this.setState({ pictures: [] });
  //   }

  //   if (prevProps.query !== query || prevProps.page !== page) {
  //     this.setState({ status: 'pending' });
  //     this.props.hideBtn();
  //     fetch(
  //       `https://pixabay.com/api/?q=${query}&page=${page}&key=28740623-faa9572de77969117d7ae64be&image_type=photo&orientation=horizontal&per_page=${perPage}`
  //     )
  //       .then(res => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(
  //           new Error('Виникла помилка пошуку, повторіть спробу згодом')
  //         );
  //       })
  //       .then(pictures => {
  //         if (pictures.totalHits > total) {
  //           this.props.showBtn();
  //         } else {
  //           this.props.hideBtn();
  //         }
  //         this.setState(prevState => {
  //           return {
  //             pictures: [...prevState.pictures, ...pictures.hits],
  //             status: 'resolved',
  //           };
  //         });
  //       })
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //   }
  // }
  // ==================================================

  render() {
    const { pictures, error, status } = this.state;

    if (status === 'idle') {
      return <h2 className={s.Text}>Відсутній запит!!!</h2>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved' && this.state.pictures.length === 0) {
      return (
        <h2 className={s.Text}>
          На жаль, немає зображень, які відповідають Вашому пошуковому запиту.
          Будь ласка, спробуйте ще раз!
        </h2>
      );
    }
    if (status === 'resolved' && this.state.pictures.total !== 0) {
      return (
        <ul className={s.ImageGallery}>
          {pictures.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalletyItem
              key={id}
              src={webformatURL}
              alt={this.props.query}
              onOpenModal={this.props.onOpenModal}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
  }
}

export default ImageGallery;
