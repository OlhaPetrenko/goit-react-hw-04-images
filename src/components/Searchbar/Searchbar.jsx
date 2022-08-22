import { Component } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      //   toast('Введіть запит!');
      alert('Введіть запит!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.Button}>
            <span className={s.Label}>Search</span>
          </button>

          <input
            className={s.Input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            value={this.state.query}
            placeholder="Пошук зображень та фотографій"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
