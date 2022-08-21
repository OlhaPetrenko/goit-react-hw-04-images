// import PropTypes from 'prop-types';
import { Component } from 'react';

import ImageGalletyItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  static defaultProps = {
    perPage: 12,
  };

  state = {
    pictures: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, perPage } = this.props;
    const total = perPage * this.props.page;
    //   console.log('total', total);

    if (prevProps.query !== this.props.query) {
      this.setState({ pictures: [] });
    }

    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=28740623-faa9572de77969117d7ae64be&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error('Виникла помилка пошуку, повторіть спробу згодом')
          );
        })
        .then(pictures => {
          if (pictures.totalHits > total) {
            // console.log('total', total);
            // console.log('totalHits', pictures.totalHits);
            // console.log('pictures', pictures);
            this.props.showBtn();
          } else {
            this.props.hideBtn();
          }
          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...pictures.hits],
              status: 'resolved',
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    // console.log(this.state);
    // console.log(this.state.pictures);
  }
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
          {pictures.map(({ id, webformatURL }) => (
            <ImageGalletyItem
              key={id}
              src={webformatURL}
              alt={this.props.query}
            />
          ))}
        </ul>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
  }

  //

  // return (
  //   <>
  //     {error && <h1>{error.message}</h1>}
  //     {loading && <p>завантажуємо...</p>}
  //     {!pictures && !loading && <p>Відсутній запит!!!</p>}

  //     {pictures && (
  //       <ul className={s.ImageGallery}>
  //         {pictures.hits.map(({ id, webformatURL }) => (
  //           <ImageGalletyItem
  //             key={id}
  //             src={webformatURL}
  //             alt={this.props.query}
  //           />
  //         ))}
  //       </ul>
  //     )}
  //   </>
  // );
}

export default ImageGallery;
