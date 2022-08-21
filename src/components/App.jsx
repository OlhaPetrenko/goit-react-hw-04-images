import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

import s from './App.module.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    visibleBtn: false,
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
  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getQuery} />
        <ToastContainer />
        <ImageGallery
          query={this.state.query}
          page={this.state.page}
          showBtn={this.showBtn}
          hideBtn={this.hideBtn}
        />
        {this.state.visibleBtn && <Button onClick={this.addPictures} />}
      </div>
    );
  }
}

export default App;
