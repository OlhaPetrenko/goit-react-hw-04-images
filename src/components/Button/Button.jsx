// import { Component } from 'react';
import s from './Button.module.css';

// class Button extends Component {
//   state = {};
//   render() {
//     return (
//       <button type="button" className={s.Button} onClick={this.handleDecrement}>
//         Load more
//       </button>
//     );
//   }
// }

// export default Button;

function Button({ onClick }) {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;
