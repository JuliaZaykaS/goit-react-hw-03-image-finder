// import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modal = document.querySelector('#modal-root');
console.log(modal);
export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick)
  }

  onEscClick = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  }

  onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.onBackdropClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
        modal
    );
  }
}
// export default function Modal({ children }) {
//   return createPortal(
//     <div className={s.Overlay}>
//       <div className={s.Modal}>{this.props.children}</div>
//     </div>,

//     modal,
//   );
// }
// export default function Modal({url, name}) {
//   const modal = document.querySelector('#modal-root')
//   return (
//     createPortal(

//     <div className={s.Overlay}>
//       <div className={s.Modal}>
//         <img src={url} alt={name} />
//       </div>
//       </div>,
//       modal
//     )
//   );
// }
