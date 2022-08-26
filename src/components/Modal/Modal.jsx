import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalEl = document.querySelector('#modal-root');

function Modal({ onCloseModal, children }) {
  useEffect(() => {
    function hendleKeyDown(event) {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    }

    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [onCloseModal]);

  function hendleOverlayClick(event) {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }

  return createPortal(
    <div className={s.Overlay} onClick={hendleOverlayClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalEl
  );
}
Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
