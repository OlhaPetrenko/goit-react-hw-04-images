import { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalEl = document.querySelector('#modal-root');

class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  hendleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.hendleOverlayClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalEl
    );
  }
}

export default Modal;
