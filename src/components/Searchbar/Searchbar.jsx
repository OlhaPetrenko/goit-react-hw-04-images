import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  function handleChange(event) {
    setQuery(event.currentTarget.value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim() === '') {
      alert('Введіть запит!');
      return;
    }
    onSubmit(query);
    setQuery('');
  }

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.Button}>
          <span className={s.Label}>Search</span>
        </button>

        <input
          className={s.Input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Пошук зображень та фотографій"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
